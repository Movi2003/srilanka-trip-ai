// lib/comfort.ts
import * as tf from '@tensorflow/tfjs';

// Simple regression model for comfort score (0-1)
export async function getComfortScore(temp: number, humidity: number, crowd: number, hour: number) {
  // Load or train model – for simplicity, train a small one on mock data
  const model = tf.sequential();
  model.add(tf.layers.dense({units: 8, inputShape: [4], activation: 'relu'}));
  model.add(tf.layers.dense({units: 1, activation: 'sigmoid'})); // 0-1 score

  model.compile({optimizer: 'adam', loss: 'meanSquaredError'});

  // Mock training data (temp, humidity, crowd, hour -> score)
  const xs = tf.tensor2d([
    [30, 80, 50, 12], [25, 60, 20, 8], [35, 90, 70, 14], // bad, good, bad
    // Add more data from OpenWeather historical
  ]);
  const ys = tf.tensor2d([[0.4], [0.9], [0.2]]);

  await model.fit(xs, ys, {epochs: 100});

  const input = tf.tensor2d([[temp, humidity, crowd, hour]]);
  const prediction = model.predict(input) as tf.Tensor;
  const score = (await prediction.data())[0] * 100; // % 

  return Math.round(score);
}

// In page.tsx, call getComfortScore with data from OpenWeather API
// Example: getComfortScore(28, 70, 40, 9) → ~75%