import { getTelegramUser } from "../../lib/telegram";
import { useGame } from "./gameStore";

export async function loadPlayer() {

  const user = getTelegramUser();


  if (!user) {
    console.log("Usuário Telegram não encontrado");
    return;
  }


  try {

    const response = await fetch("/api/player", {

      method:"POST",

      headers:{
        "Content-Type":"application/json",
      },


      body:JSON.stringify(user),

    });



    if(!response.ok){

      console.error(
        "Erro ao carregar jogador:",
        await response.text()
      );

      return;

    }



    const player = await response.json();



    console.log(
      "Jogador carregado do banco:",
      player
    );



    useGame.getState().setPlayer({

      id: player.id,

      coins: player.coins,

      level: player.level,

      energy: player.energy,


      skills:
        player.skills ?? undefined,


      owned:
        player.owned ?? undefined,


      missions:
        player.missions ?? undefined,


    });



  } catch(error){


    console.error(
      "Erro de conexão com servidor:",
      error
    );


  }

}