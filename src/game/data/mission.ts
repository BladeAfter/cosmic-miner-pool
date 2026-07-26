import { Mission } from "../store/types";

export const initialMissions: Mission[] = [
  {
    id: "d1",
    title: "Colete 5.000 Coins",
    desc: "Minere sem parar",
    reward: {
      gold: 500,
    },
    progress: 0,
    goal: 5000,
    type: "daily",
  },

  {
    id: "d2",
    title: "Melhore 3 habilidades",
    desc: "Evolua seu império",
    reward: {
      crystals: 200,
    },
    progress: 0,
    goal: 3,
    type: "daily",
  },

  {
    id: "d3",
    title: "Assista 5 anúncios",
    desc: "Ganhe 5.000 Coins",
    reward: {
      gold: 5000,
    },
    progress: 0,
    goal: 5,
    type: "daily",
  },

  {
    id: "w1",
    title: "Compre 5 itens na loja",
    desc: "Expanda seu arsenal",
    reward: {
      gold: 10000,
      crystals: 500,
    },
    progress: 0,
    goal: 5,
    type: "weekly",
  },

  {
    id: "w2",
    title: "Ative 1 Booster",
    desc: "Multiplique sua produção",
    reward: {
      crystals: 1000,
    },
    progress: 0,
    goal: 1,
    type: "weekly",
  },

  {
    id: "s1",
    title: "Entrar no Telegram",
    desc: "Junte-se à comunidade",
    reward: {
      gold: 1000,
      crystals: 100,
    },
    progress: 0,
    goal: 1,
    type: "social",
    cta: "Telegram",
  },

  {
    id: "s2",
    title: "Seguir no X",
    desc: "Fique por dentro das novidades",
    reward: {
      gold: 800,
      crystals: 50,
    },
    progress: 0,
    goal: 1,
    type: "social",
    cta: "News",
  },

  {
    id: "s3",
    title: "Ativar Pagamentos",
    desc: "Configure sua carteira",
    reward: {
      gold: 1500,
      crystals: 150,
    },
    progress: 0,
    goal: 1,
    type: "social",
    cta: "Payments",
  },
];