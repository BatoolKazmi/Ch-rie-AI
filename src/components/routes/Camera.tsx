import * as faceapi from "face-api.js";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Types for landmarks
interface Landmark {
  x: number;
  y: number;
}

interface Regions {
  middleForehead: Landmark;
  leftUndereye: Landmark;
  rightUndereye: Landmark;
  leftCheek: Landmark;
  rightCheek: Landmark;
}

function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [loadingModels, setLoadingModels] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [photoTaken, setPhotoTaken] = useState(false);

  const navigate = useNavigate();
  const countdownTime = 5;
  const countdownInterval = useRef<number | null>(null);

  useEffect(() => {
    startVideo();
    return () => {
      if (countdownInterval.current) clearInterval(countdownInterval.current);
    };
  }, []);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        await loadModels();
        detectFaces();
      }
    } catch {
      setErrorMessage(
        "Unable to access webcam. Please check your device permissions."
      );
    }
  };

  const loadModels = async () => {
    try {
      setLoadingModels(true);
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      ]);
      setLoadingModels(false);
      detectFaces();
    } catch {
      setErrorMessage(
        "Error loading face detection models. Please try again later."
      );
    }
  };

  const detectFaces = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const displaySize = { width: video.videoWidth, height: video.videoHeight };
    faceapi.matchDimensions(canvas, displaySize);

    const detect = async () => {
      try {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks();

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );
        const context = canvas.getContext("2d");

        if (context) {
          // Clear the canvas
          context.clearRect(0, 0, canvas.width, canvas.height);

          /// OVAL DETECTION ///
          // Determine the oval position and size
          const ovalX = canvas.width / 2;
          const ovalY = canvas.height / 2;
          const ovalRadiusX = 150;
          const ovalRadiusY = 200;

          // Draw the transparent overlay
          context.save();
          context.fillStyle = "rgba(0, 0, 0, 0.6)"; // Transparent black overlay
          context.fillRect(0, 0, canvas.width, canvas.height);
          context.globalCompositeOperation = "destination-out";
          context.beginPath();
          context.ellipse(
            ovalX,
            ovalY,
            ovalRadiusX,
            ovalRadiusY,
            0,
            0,
            2 * Math.PI
          );
          context.fill();
          context.restore();

          // Draw the oval guide
          let ovalColor = "red";
          if (
            resizedDetections.length === 1 &&
            isFaceInOval(
              resizedDetections[0].detection.box,
              ovalX,
              ovalY,
              ovalRadiusX,
              ovalRadiusY
            )
          ) {
            ovalColor = "green";
          }
          context.beginPath();
          context.ellipse(
            ovalX,
            ovalY,
            ovalRadiusX,
            ovalRadiusY,
            0,
            0,
            2 * Math.PI
          );
          context.lineWidth = 3;
          context.strokeStyle = ovalColor;
          context.stroke();

          // Handle countdown display
          if (ovalColor === "green" && countdown !== null) {
            context.fillStyle = "white";
            context.font = "30px Arial";
            context.textAlign = "center";
            context.fillText(countdown.toString(), ovalX, ovalY);
          }

          // Draw detections and landmarks
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

          // Handle face detection errors
          if (resizedDetections.length === 0) {
            setErrorMessage(
              "No face detected. Please position yourself in front of the camera."
            );
            pauseAndResetCountdown();
          } else if (resizedDetections.length > 1) {
            setErrorMessage(
              "Multiple faces detected. Ensure only one face is visible."
            );
            pauseAndResetCountdown();
          } else {
            const faceBox = resizedDetections[0].detection.box;

            if (
              !isFaceInOval(faceBox, ovalX, ovalY, ovalRadiusX, ovalRadiusY)
            ) {
              setErrorMessage("Align your face within the oval.");
              pauseAndResetCountdown();
            } else {
              setErrorMessage(null); // Clear error if all checks pass
              startCountdown();
            }
          }
        }

        requestAnimationFrame(detect);
      } catch (error) {
        setErrorMessage("Face detection encountered an unexpected issue.");
      }
    };

    detect();
  };

  // Helper function to check if face is in oval
  const isFaceInOval = (
    faceBox: { x: number; y: number; width: number; height: number },
    ovalX: number,
    ovalY: number,
    ovalRadiusX: number,
    ovalRadiusY: number
  ) => {
    const faceCenterX = faceBox.x + faceBox.width / 2;
    const faceCenterY = faceBox.y + faceBox.height / 2;

    // Equation of an ellipse: (x-h)^2/a^2 + (y-k)^2/b^2 <= 1
    const normalizedX = (faceCenterX - ovalX) / ovalRadiusX;
    const normalizedY = (faceCenterY - ovalY) / ovalRadiusY;

    return normalizedX * normalizedX + normalizedY * normalizedY <= 1;
  };

  const startCountdown = () => {
    if (countdownInterval.current) return; // Prevent starting a new interval if one is already running

    setCountdown(countdownTime);
    countdownInterval.current = window.setInterval(() => {
      setCountdown((current) => {
        if (current === 1) {
          clearInterval(countdownInterval.current!);
          countdownInterval.current = null;
          takePicture();
          return null;
        }
        return current! - 1;
      });
    }, 1000);
  };

  const pauseAndResetCountdown = () => {
    if (countdownInterval.current) {
      clearInterval(countdownInterval.current);
      countdownInterval.current = null;
    }
    setCountdown(null); // Reset countdown
  };

  const takePicture = async () => {
    if (photoTaken) return;

    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvasRef.current?.getContext("2d");

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Detect landmarks
      const detections = await faceapi
        .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks();

      // Get regions from landmarks
      const regions = getRegionsFromLandmarks(detections?.landmarks);

      const scaledRegions = {
        middleForehead: scaleCoordinates(
          regions.middleForehead,
          videoWidth,
          videoHeight,
          canvasWidth,
          canvasHeight
        ),
        leftUndereye: scaleCoordinates(
          regions.leftUndereye,
          videoWidth,
          videoHeight,
          canvasWidth,
          canvasHeight
        ),
        rightUndereye: scaleCoordinates(
          regions.rightUndereye,
          videoWidth,
          videoHeight,
          canvasWidth,
          canvasHeight
        ),
        leftCheek: scaleCoordinates(
          regions.leftCheek,
          videoWidth,
          videoHeight,
          canvasWidth,
          canvasHeight
        ),
        rightCheek: scaleCoordinates(
          regions.rightCheek,
          videoWidth,
          videoHeight,
          canvasWidth,
          canvasHeight
        ),
      };

      context?.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Get the RGB values from the canvas at the landmark positions
      const middleForeheadColor = getPixelColor(
        scaledRegions.middleForehead.x,
        scaledRegions.middleForehead.y
      );
      const leftUndereyeColor = getPixelColor(
        scaledRegions.leftUndereye.x,
        scaledRegions.leftUndereye.y
      );
      const rightUndereyeColor = getPixelColor(
        scaledRegions.rightUndereye.x,
        scaledRegions.rightUndereye.y
      );
      const leftCheekColor = getPixelColor(
        scaledRegions.leftCheek.x,
        scaledRegions.leftCheek.y
      );
      const rightCheekColor = getPixelColor(
        scaledRegions.rightCheek.x,
        scaledRegions.rightCheek.y
      );

      console.log("Middle Forehead Color:", middleForeheadColor);
      console.log("Left Undereye Color:", leftUndereyeColor);
      console.log("Right Undereye Color:", rightUndereyeColor);
      console.log("Left Cheek Color:", leftCheekColor);
      console.log("Right Cheek Color:", rightCheekColor);

      // Log the RGB values as a JSON object in [r, g, b] format
      const jsonOutput = JSON.stringify(
        {
          foreheadcolor: [
            middleForeheadColor.r,
            middleForeheadColor.g,
            middleForeheadColor.b,
          ],
          leftCheekColor: [
            leftCheekColor.r,
            leftCheekColor.g,
            leftCheekColor.b,
          ],
          rightCheekColor: [
            rightCheekColor.r,
            rightCheekColor.g,
            rightCheekColor.b,
          ],
          leftundereyecolor: [
            leftUndereyeColor.r,
            leftUndereyeColor.g,
            leftUndereyeColor.b,
          ],
          rightundereyecolor: [
            rightUndereyeColor.r,
            rightUndereyeColor.g,
            rightUndereyeColor.b,
          ],
        },
        null,
        2
      );

      console.log(jsonOutput);

      if (context) {
        // Draw circles for the new regions
        drawCircle(
          context,
          scaledRegions.middleForehead.x,
          scaledRegions.middleForehead.y,
          5
        ); // Middle Forehead
        drawCircle(
          context,
          scaledRegions.leftUndereye.x,
          scaledRegions.leftUndereye.y,
          5
        ); // Left Undereye
        drawCircle(
          context,
          scaledRegions.rightUndereye.x,
          scaledRegions.rightUndereye.y,
          5
        ); // Right Undereye
        drawCircle(
          context,
          scaledRegions.leftCheek.x,
          scaledRegions.leftCheek.y,
          5
        ); // Left Cheek
        drawCircle(
          context,
          scaledRegions.rightCheek.x,
          scaledRegions.rightCheek.y,
          5
        ); // Right Cheek
      }

      // Convert canvas to image data URL
      const imageUrl = canvas.toDataURL("image/png");

      // Reset photo taken status
      setPhotoTaken(true);

      navigate("/picture", { state: { imageUrl } });
    }
  };

  const scaleCoordinates = (
    landmarkPoint: Landmark,
    videoWidth: number,
    videoHeight: number,
    canvasWidth: number,
    canvasHeight: number
  ): Landmark => {
    return {
      x: (landmarkPoint.x / videoWidth) * canvasWidth,
      y: (landmarkPoint.y / videoHeight) * canvasHeight,
    };
  };

  const getPixelColor = (
    x: number,
    y: number
  ): { r: number; g: number; b: number } => {
    const context = canvasRef.current?.getContext("2d");
    if (context) {
      const pixel = context.getImageData(x, y, 1, 1).data;
      return {
        r: pixel[0],
        g: pixel[1],
        b: pixel[2],
      };
    }
    return { r: 0, g: 0, b: 0 }; // Default return if context is null
  };

  const drawCircle = (
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number
  ): void => {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fillStyle = "rgba(0, 0, 0, 0.0)";
    context.fill();
    context.stroke();
  };

  const getRegionsFromLandmarks = (landmarks: any): Regions => {
    if (!landmarks) throw new Error("Landmarks are not defined");

    // Middle forehead: Use an approximate position between the eyebrows
    const middleForehead = {
      x:
        (landmarks.getLeftEyeBrow()[2].x + landmarks.getRightEyeBrow()[2].x) /
        2,
      y:
        (landmarks.getLeftEyeBrow()[2].y + landmarks.getRightEyeBrow()[2].y) /
          2 -
        20, // Offset slightly upwards
    };

    // Left undereye: Use a landmark below the left eye
    const leftUndereye = {
      x: landmarks.getLeftEye()[4].x, // Lower edge of the left eye
      y: landmarks.getLeftEye()[4].y + 13, // Lower edge of the left eye
    };
    // Right undereye: Use a landmark below the right eye
    const rightUndereye = {
      x: landmarks.getRightEye()[4].x, // Lower edge of the right eye
      y: landmarks.getRightEye()[4].y + 13, // Lower edge of the right eye
    };

    // Left cheek: Approximate position near the left cheekbone
    const leftCheek = {
      x: landmarks.getJawOutline()[3].x + 20, // Near the jaw but closer to the cheekbone
      y: landmarks.getJawOutline()[3].y, // Near the jaw but closer to the cheekbone
    };

    // Right cheek: Approximate position near the right cheekbone
    const rightCheek = {
      x: landmarks.getJawOutline()[13].x - 20, // Near the jaw but closer to the cheekbone
      y: landmarks.getJawOutline()[13].y, // Near the jaw but closer to the cheekbone
    };

    return {
      middleForehead,
      leftUndereye,
      rightUndereye,
      leftCheek,
      rightCheek,
    };
  };

  return (
    <div className="myapp" style={{ position: "relative" }}>
      <h1>Face Detection</h1>
      {loadingModels && <h2>Loading models, please wait...</h2>}
      {errorMessage && <h2 style={{ color: "red" }}>{errorMessage}</h2>}
      {!loadingModels && !errorMessage && countdown !== null && (
        <h2>Taking picture in {countdown}...</h2>
      )}
      <div className="appvide" style={{ position: "relative" }}>
        <video
          crossOrigin="anonymous"
          ref={videoRef}
          autoPlay
          style={{ position: "absolute", zIndex: 1, transform: "scaleX(-1)" }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 2,
            transform: "scaleX(-1)",
          }}
        />
      </div>
    </div>
  );
}

export default Camera;
