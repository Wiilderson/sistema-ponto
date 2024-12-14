import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as cors from 'cors';

admin.initializeApp();
const corsHandler = cors({ origin: true });

export const marcarPonto = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).send({ error: 'Método não permitido.' });
    }

    const { codigo } = req.body;

    if (!codigo) {
      return res.status(400).send({ error: 'O campo "codigo" é obrigatório.' });
    }

    try {
      // Referência à coleção "users"
      const usuariosRef = admin.firestore().collection('users');
      const pontosRef = admin.firestore().collection('pontos');

      // Consulta para buscar o usuário pelo campo "code"
      const userQuery = await usuariosRef
        .where('code', '==', codigo)
        .limit(1)
        .get();

      if (userQuery.empty) {
        console.log('Nenhum usuário encontrado com o código fornecido.');
        return res.status(404).send({ error: 'Usuário não encontrado.' });
      }

      // Obtemos o primeiro documento retornado pela query
      const userDoc = userQuery.docs[0];
      const userData = userDoc.data();
      console.log('Usuário encontrado:', userData);

      // Adicionar o ponto na coleção "pontos"
      const timestamp = new Date();
      const novoPonto = {
        userId: userDoc.id,
        timestamp: timestamp,
        user: userDoc.data(), // Inclui informações do usuário
      };

      // Salvar na coleção "pontos"
      await pontosRef.add(novoPonto);
      console.log('Ponto registrado com sucesso:', novoPonto);
      return res.status(200).send({ message: 'Ponto registrado com sucesso!' });
    } catch (error) {
      console.error('Erro ao registrar ponto:', error);
      return res.status(500).send({ error: 'Erro ao registrar ponto.' });
    }
  });
});
