const createEmailTemplate = (data) => {
  const { name, checkIn, checkOut, adults, kids, rooms, message } = data;

  const colors = {
    bgApp: "#F0F7FC", // brand.50
    bgLight: "#E6F0F8", // brand.100
    accentLight: "#BCE7F7", // brand.300
    primary: "#6998A7", // brand.500 (Tu color principal)
    darkText: "#313F3E", // brand.600 (Texto oscuro elegante)
    headerBg: "#1E2626", // brand.800 (Fondo oscuro premium para el header)
    white: "#ffffff",
  };

  // URL DE TU LOGO EN CLOUDINARY
  const logoUrl =
    "https://res.cloudinary.com/drfyy4i0s/image/upload/v1770903132/icon_wozxex.png";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
  
  <style>
    /* Reset y Estilos Base */
    body { 
      margin: 0; 
      padding: 0; 
      background-color: ${colors.bgApp}; 
      font-family: 'Lato', Helvetica, Arial, sans-serif; 
      color: ${colors.darkText};
    }
    
    .container { 
      max-width: 600px; 
      margin: 40px auto; 
      background-color: ${colors.white}; 
      border-radius: 8px; 
      overflow: hidden; 
      box-shadow: 0 4px 15px rgba(0,0,0,0.05); 
    }

    /* Header Premium */
    .header { 
      background-color: ${colors.headerBg}; 
      padding: 40px 20px; 
      text-align: center; 
      border-bottom: 4px solid ${colors.primary};
    }
    
    /* Estilo para el Logo */
    .header img {
      width: 80px; /* Tamaño del logo */
      height: auto;
      margin-bottom: 15px;
      display: inline-block;
    }

    .header h1 {
      color: ${colors.white};
      margin: 0;
      font-family: 'Playfair Display', Georgia, serif; 
      font-size: 26px;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    .header p {
      color: ${colors.primary};
      margin: 8px 0 0;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }

    /* Contenido */
    .content { padding: 40px; }
    
    h2 { 
      color: ${colors.darkText}; 
      margin-top: 0; 
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 22px;
    }
    
    p { 
      color: #5d6d6c; 
      line-height: 1.6; 
      font-size: 15px;
    }

    /* Caja de Resumen */
    .highlight-box { 
      background-color: ${colors.bgLight}; 
      border-left: 5px solid ${colors.primary}; 
      padding: 25px; 
      margin: 25px 0; 
      border-radius: 4px; 
    }

    /* Caja de Peticiones Especiales */
    .note-box { 
      background-color: #fff; 
      border: 1px dashed ${colors.primary}; 
      padding: 20px; 
      margin-top: 25px; 
      border-radius: 6px; 
      color: ${colors.darkText};
      position: relative;
    }
    
    .note-label {
      background-color: ${colors.white};
      color: ${colors.primary};
      font-weight: bold;
      font-size: 11px;
      text-transform: uppercase;
      padding: 0 10px;
      position: absolute;
      top: -10px;
      left: 10px;
      font-family: 'Lato', sans-serif;
    }

    /* Botón */
    .btn { 
      display: inline-block; 
      background-color: ${colors.darkText}; 
      color: ${colors.bgApp}; 
      padding: 14px 35px; 
      text-decoration: none; 
      border-radius: 8px; 
      font-weight: bold; 
      margin-top: 25px; 
      font-size: 14px;
      letter-spacing: 0.5px;
    }

    /* Tablas y Datos */
    .label { font-size: 10px; text-transform: uppercase; color: #889999; font-weight: bold; display: block; margin-bottom: 5px; letter-spacing: 0.5px; }
    .value { font-size: 16px; color: ${colors.darkText}; font-weight: 600; font-family: 'Playfair Display', serif; }
    table { width: 100%; border-collapse: collapse; }
    td { padding-bottom: 20px; vertical-align: top; }

    /* Footer */
    .footer { 
      background-color: ${colors.bgApp}; 
      padding: 30px; 
      text-align: center; 
      color: #889999; 
      font-size: 12px; 
      border-top: 1px solid ${colors.bgLight};
    }
  </style>
</head>
<body>

  <div class="container">
    
    <div class="header">
      <img src="${logoUrl}" alt="Logotipo Altura Andina" />
      
      <h1>Altura Andina</h1>
      <p>Hotel & Spa • Mérida</p>
    </div>

    <div class="content">
      <h2>Estimado(a) ${name},</h2>
      <p>
        Gracias por elegir <strong>Altura Andina</strong> para tu próxima escapada. 
        Hemos recibido tu solicitud de reserva y nuestro equipo de recepción ya está verificando la disponibilidad para tus fechas.
      </p>

      <div class="highlight-box">
        <table>
          <tr>
            <td width="50%">
              <span class="label">Fecha de Llegada</span>
              <span class="value">${checkIn}</span>
            </td>
            <td width="50%">
              <span class="label">Fecha de Salida</span>
              <span class="value">${checkOut}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span class="label">Acompañantes</span>
              <span class="value">${adults} Adultos, ${kids} Niños</span>
            </td>
            <td>
              <span class="label">Espacio Solicitado</span>
              <span class="value">${rooms} Habitación(es)</span>
            </td>
          </tr>
        </table>
      </div>

      ${
        message
          ? `
        <div class="note-box">
          <span class="note-label">✦ Tus Peticiones Especiales</span>
          <p style="margin: 5px 0 0 0; font-style: italic; color: #555;">
            "${message}"
          </p>
          <p style="margin: 10px 0 0 0; font-size: 12px; color: ${colors.primary};">
            * Haremos todo lo posible por cumplir tus deseos según disponibilidad.
          </p>
        </div>
      `
          : ""
      }

      <p style="margin-top: 30px;">
        En breve recibirás un segundo correo confirmando tu número de habitación y las opciones de pago seguro.
      </p>

      <div style="text-align: center;">
        <a href="https://wa.me/584241234567" class="btn">GESTIONAR MI RESERVA</a>
      </div>
    </div>

    <div class="footer">
      <p style="margin: 0; font-weight: bold; color: ${colors.darkText};">Altura Andina Hotel & Spa</p>
      <p style="margin: 5px 0;">Av. Principal, Sector Las Heroínas, Mérida, Venezuela.</p>
      <p style="margin-top: 15px; font-size: 10px;">
        Este es un correo automático. Por favor no respondas a esta dirección.
      </p>
    </div>

  </div>

</body>
</html>
  `;
};

module.exports = { createEmailTemplate };
