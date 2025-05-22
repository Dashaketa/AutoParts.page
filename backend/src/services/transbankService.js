// src/services/transbankService.js
const {
    WebpayPlus,
    Options,
    IntegrationApiKeys,
    Environment,
    IntegrationCommerceCodes
  } = require('transbank-sdk')
  
  // Creamos las opciones de integración con los valores de prueba embebidos
  const tbOptions = new Options(
    IntegrationCommerceCodes.WEBPAY_PLUS,  // 597055555532
    IntegrationApiKeys.WEBPAY,            // clave de prueba
    Environment.Integration               // https://webpay3gint.transbank.cl
  )
  
  // Exportamos la transacción configurada
  module.exports = new WebpayPlus.Transaction(tbOptions)
  