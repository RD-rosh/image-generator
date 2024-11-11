import React, { useState } from 'react';
import axios from 'axios';

const TextToImageGenerator = () => {
  const [textInput, setTextInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    setImageUrl(''); 
    try {
      const response = await axios.post(
        `${process.env.AZURE_OPENAI_API_ENDPOINT}`,
        {
          prompt: textInput,
          n: 1,
          size: "1024x1024",
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'api-key': process.env.AZURE_OPENAI_API_KEY,
          },
        }
      );
      const imageData = response.data.data[0].url;
      setImageUrl(imageData); 
    } catch (error) {
      console.error("Error generating image:", error);
    }
    setLoading(false);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Text to Image Generator</h2>
      <input
        type="text"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        placeholder="Enter text for image generation"
        style={{ padding: '10px', width: '300px' }}
      />
      <button onClick={generateImage} style={{ padding: '10px', marginLeft: '10px' }}>
        Generate Image
      </button>
      {loading && <p>Generating image...</p>}
      {imageUrl && (
        <div style={{ marginTop: '20px' }}>
          <img src={imageUrl} alt="Generated" style={{ width: '300px', height: '300px', objectFit: 'contain' }} />
        </div>
      )}
    </div>
  );
};

export default TextToImageGenerator;
