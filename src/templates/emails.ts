import { dateToString, getDateExtensive } from "../services/date";

type GenerateReportEmailParams = {
  name: string;
  fieldName: string;
  date: Date;
};

function generateReportEmail({
  name,
  fieldName,
  date,
}: GenerateReportEmailParams) {
  return `<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AGRI-ARO</title>
    <style>
        body{
            font-family: sans-serif;
        }
        .d-flex{
            display: flex;
        }

        .items-center{
            align-items: center;
        }
        .gap{
            gap: 10px;
        }

        p{
            margin-bottom: 15px;
        }
    </style>
</head>
<body>
    <div class="d-flex gap items-center">
        <img src="https://api-agriaro.arotec.ao/assets/icons/seed_green.png" width="30" alt="">
       <strong> AGRI-ARO</strong>
    </div>

  <p><strong>Assunto:</strong> Relatório Disponível</p> 

   <p> Olá ${name},</p>
    
    <p>
    Gostaríamos de informar que o relatório do campo ${fieldName} referente ao dia ${getDateExtensive(date)} está agora disponível.
</p> 
<p>
    Para acessar o relatório, por favor, clique 
    <a href="https://agriaro.arotec.ao/app/report?date=${dateToString(date)}"> Aqui</a>
</p>
<p>
    Caso tenha alguma dúvida ou necessite de mais informações, estamos à disposição.
</p>
<br><br>
    Atenciosamente,  <br>
    <strong>AROTEC</strong>
</body>
</html>`;
}

type GenerateAlertEmailParams = {
  name: string;
  date: Date;
  alertas: {
    title: string;
    value: number;
    unit: string;
    interval: {
      min: number;
      max: number;
    };
  }[];
};
export { generateReportEmail };
