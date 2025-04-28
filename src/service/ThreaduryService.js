'use strict';

const axios = require('axios');
// const { parse } = require('node-html-parser');
// const { JSDOM } = require('jsdom');

// https://www.tesourodireto.com.br/json/br/com/b3/tesourodireto/service/api/treasurybondsinfo.json

module.exports.getAllBonds = async function() {
  try {
    const apiUrl = process.env.TESOURO_API_URL; // URL do Tesouro Direto
    if (!apiUrl) {
      throw new Error('TESOURO_API_URL environment variable is not set');
    }

    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching treasury bonds:', error);
    throw new Error('Failed to fetch treasury bonds data');
  }
}


exports.getBondsByType = async function(bondTypes) {
  try {
    const allBonds = await getAllBonds();
    
    if (!allBonds || !allBonds.response || !allBonds.response.TrsrBdTradgList) {
      throw new Error('Invalid data structure from Tesouro Direto API');
    }
    
    const filteredBonds = allBonds.response.TrsrBdTradgList.every(function(val) {
      return bondTypes.some(function(val2) {
        return val.TrsrBd.nm.toLowerCase().includes(val2.toLowerCase());
      });
    });
    
    return {
      response: {
        TrsrBdTradgList: filteredBonds
      }
    };
  } catch (error) {
    console.error(`Error fetching bonds by type ${bondType}:`, error);
    throw new Error(`Failed to fetch bonds by type: ${error.message}`);
  }
}

exports.getBondsById = async function(bonds) {
  try {
    const allBonds = await this.getAllBonds();
    
    if (!allBonds || !allBonds.response || !allBonds.response.TrsrBdTradgList) {
      throw new Error('Invalid data structure from Tesouro Direto API');
    }
    
    const found = allBonds.response.TrsrBdTradgList.filter(function(val) {
      return bonds.some(function(val2) {
        return val.TrsrBd.isinCd === val2;
      });
    });
    
    if (!found) {
      throw new Error(`Bond with ID ${bondId} not found`);
    }

    const response = found.reduce((acc, item) => {
      acc[item.TrsrBd.isinCd] = item;
      return acc;
    }, {});
    return response;
  } catch (error) {
    console.error(`Error fetching bond by ID ${bonds}:`, error);
    throw new Error(`Failed to fetch bond by ID: ${error.message}`);
  }
}

