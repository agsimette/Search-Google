
import { Controller, Post, Body } from '@nestjs/common';
import axios from 'axios';

@Controller('search')
export class AppController {

  async sendParamsAtInterval(searchParams: any, frequency: number) {
    while (true) {
      try {
        const golangURL = 'http://localhost:8080'; 
        const response = await axios.post(golangURL, searchParams, {
          headers: {
            'Content-Type': 'application/json', 
          },
        });
        console.log('Resposta do robô:', response.data);
      } catch (error) {
        console.error('Erro ao enviar parâmetros para o robô:', error);
      }
      await new Promise(resolve => setTimeout(resolve, frequency));
    }
  }

  @Post()
  async search(@Body() searchParams: any) {
    try {
      const { location, keywords, frequency, frequencyUnit } = searchParams;
      const searchTerm = `${location} ${keywords}`; 

      // Converte a frequência para segundos
      let frequencyInSeconds = parseInt(frequency);
      if (frequencyUnit === 'minutos') {
        frequencyInSeconds *= 60;
      } else if (frequencyUnit === 'horas') {
        frequencyInSeconds *= 3600;
      } else if (frequencyUnit === 'dias') {
        frequencyInSeconds *= 86400;
      }

      // Chama a função para enviar os parâmetros em intervalos de acordo com a frequência
      await this.sendParamsAtInterval({ term: searchTerm }, frequencyInSeconds * 1000); 

      return { message: 'Parâmetros de busca enviados com sucesso para o robô!' };
    } catch (error) {
      console.error('Erro ao enviar parâmetros para o robô:', error);
      return { error: 'Ocorreu um erro ao enviar parâmetros para o robô.' };
    }
  }
}
