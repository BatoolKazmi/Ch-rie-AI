import * as faceapi from "face-api.js";
import { useRef, useEffect } from "react";

function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    startVideo();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((currentStream) => {
        console.log("this is videoRef.current", videoRef.current);
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
        .withFaceLandmarks()
        .withFaceExpressions();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      const context = canvas.getContext("2d");
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      }

      requestAnimationFrame(detect);
    };

    detect();
  };

  return (
    <div className="myapp" style={{ position: "relative" }}>
      <h1>Face Detection</h1>
      <p>Make sure:</p>
      <ul>
        <li>You are in good lighting</li>
        <li>Your face is clearly visible (fully faced towards the camera)</li>
        <li>
          You have removed your glasses or any other accessories from your face
        </li>
      </ul>
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
