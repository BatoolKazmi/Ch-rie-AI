import * as faceapi from "face-api.js";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [loadingModels, setLoadingModels] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);

  const navigate = useNavigate();
  const countdownTime = 5;
  const countdownInterval = useRef<number | null>(null);

  useEffect(() => {
    startVideo();
    return () => {
      if (countdownInterval.current) clearInterval(countdownInterval.current);
    };
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((currentStream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = currentStream;
          loadModels();
        }
      })
      .catch(() => {
        setErrorMessage(
          "Unable to access webcam. Please check your device permissions."
        );
      });
  };

  const loadModels = async () => {
    try {
      setLoadingModels(true);
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
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
          context.clearRect(0, 0, canvas.width, canvas.height);
          faceapi.draw.drawDetections(canvas, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        }

        // Error handling based on number of faces detected
        if (resizedDetections.length === 0) {
          setErrorMessage(
            "No face detected. Please position yourself in front of the camera."
          );
          pauseAndResetCountdown();
        } else if (resizedDetections.length > 1) {
          setErrorMessage(
            "Multiple faces detected. Please ensure only one face is visible."
          );
          pauseAndResetCountdown();
        } else {
          const faceBox = resizedDetections[0].detection.box;
          const faceTooFar = faceBox.width < 100 || faceBox.height < 100; // Adjust size thresholds as needed

          if (faceTooFar) {
            setErrorMessage(
              "Your face is too far from the camera. Please move closer."
            );
            pauseAndResetCountdown();
          } else {
            setErrorMessage(null); // Clear error if everything is fine
            startCountdown();
          }
        }

        requestAnimationFrame(detect);
      } catch (error) {
        setErrorMessage("Face detection encountered an unexpected issue.");
      }
    };

    detect();
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

  const takePicture = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL("image/png");
        navigate("/picture", { state: { image: imageData } });
      }
    }
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
          style={{ position: "absolute", zIndex: 1 }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 2,
          }}
        />
      </div>
    </div>
  );
}

export default Camera;
