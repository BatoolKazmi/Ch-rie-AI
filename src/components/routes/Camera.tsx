import * as faceapi from "face-api.js";
import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [countdown, setCountdown] = useState<number | null>(null);
  const [pausedCountdown, setPausedCountdown] = useState<number | null>(null);

  const navigate = useNavigate();
  const countdownTime = 5;
  const countdownInterval = useRef<number | null>(null);

  useEffect(() => {
    startVideo();
    return () => {
      // Cleanup interval if the component unmounts
      if (countdownInterval.current) clearInterval(countdownInterval.current);
    };
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((currentStream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = currentStream;
          loadModels(); // Load models after video stream is set
        }
      })
      .catch((err) => {
        console.error("Error accessing webcam: ", err);
      });
  };

  const loadModels = () => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]).then(() => {
      detectFaces();
    });
  };

  const detectFaces = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const displaySize = { width: video.videoWidth, height: video.videoHeight };

    faceapi.matchDimensions(canvas, displaySize);

    const detect = async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      const context = canvas.getContext("2d");
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      }

      if (resizedDetections.length > 0) {
        startCountdown();
      } else {
        pauseCountdown();
      }

      requestAnimationFrame(detect);
    };

    detect();
  };
  const startCountdown = () => {
    if (countdownInterval.current) return; // Prevent starting a new interval if one is already running

    setCountdown((prev) => {
      const startValue =
        pausedCountdown !== null ? pausedCountdown : countdownTime; // Resume from paused value
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
      return startValue;
    });
    setPausedCountdown(null); // Clear paused state
  };

  const pauseCountdown = () => {
    if (countdownInterval.current) {
      clearInterval(countdownInterval.current);
      countdownInterval.current = null;
    }
    setPausedCountdown(countdown); // Save the current countdown value
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
        navigate("/picture", { state: { image: imageData } }); // Pass the image to the next page
      }
    }
  };

  return (
    <div className="myapp" style={{ position: "relative" }}>
      <h1>Face Detection</h1>
      {countdown !== null && <h2>Taking picture in {countdown}...</h2>}
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
