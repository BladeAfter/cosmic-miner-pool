import { prisma } from "../lib/prisma";

export async function POST({ request }: any) {

  try {

    const body = await request.json();

    const telegramId = BigInt(body.telegramId);
    const amount = BigInt(body.amount);


    const player = await prisma.player.findUnique({
      where:{
        telegramId
      }
    });


    if(!player){
      return new Response(
        JSON.stringify({error:"Jogador não encontrado"}),
        {status:404}
      );
    }


    if(player.coins < amount){

      return new Response(
        JSON.stringify({
          error:"Coins insuficientes"
        }),
        {status:400}
      );

    }


    const updated = await prisma.player.update({

      where:{
        telegramId
      },

      data:{
        coins:{
          decrement: amount
        }
      }

    });


    return new Response(
      JSON.stringify({
        coins: updated.coins.toString()
      }),
      {
        headers:{
          "Content-Type":"application/json"
        }
      }
    );


  } catch(e){

    console.error(e);

    return new Response(
      JSON.stringify({
        error:"Erro"
      }),
      {status:500}
    );

  }

}