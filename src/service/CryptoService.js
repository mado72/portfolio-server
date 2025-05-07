'use strict';

const axios = require('axios');

exports.getCryptoQuotesById = async function(cryptos) {
  try {
    
    if (!cryptos || !Array.isArray(cryptos)) {
      throw new Error('Invalid data structure requested');
    }

    const apiUrl = process.env.CRYPTO_API_URL;
    const result = {};

    for (const cryptoId of cryptos) {
      const response = await axios.get(`${apiUrl}${cryptoId}/ticker`);
      if (response.status === 200) {
        result[cryptoId] = response.data;
      } else {
        throw new Error(`Failed to fetch data for crypto ID: ${cryptoId}`);
      }
    }
    
    return result;
  } catch (error) {
    console.error(`Error fetching bond by ID ${cryptos}:`, error);
    throw new Error(`Failed to fetch bond by ID: ${error.message}`);
  }
}

