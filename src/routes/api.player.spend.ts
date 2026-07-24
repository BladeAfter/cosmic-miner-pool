import { prisma } from "../../lib/prisma";


export async function POST({ request }: any) {

  try {


    const body =
      await request.json();



    if (
      !body.telegramId ||
      body.amount === undefined
    ) {

      return new Response(

        JSON.stringify({
          error:"Dados obrigatórios faltando",
        }),

        {
          status:400,
          headers:{
            "Content-Type":"application/json",
          },
        }

      );

    }



    const telegramId =
      BigInt(body.telegramId);



    const amount =
      BigInt(body.amount);



    if(amount <= 0n) {

      return new Response(

        JSON.stringify({
          error:"Valor inválido",
        }),

        {
          status:400,
          headers:{
            "Content-Type":"application/json",
          },
        }

      );

    }





    const player =
      await prisma.player.findUnique({

        where:{
          telegramId,
        },

      });





    if(!player) {

      return new Response(

        JSON.stringify({
          error:"Jogador não encontrado",
        }),

        {
          status:404,
          headers:{
            "Content-Type":"application/json",
          },
        }

      );

    }






    if(player.coins < amount) {


      return new Response(

        JSON.stringify({
          error:"Coins insuficientes",
        }),

        {
          status:400,
          headers:{
            "Content-Type":"application/json",
          },
        }

      );

    }





    const updated =
      await prisma.player.update({

        where:{
          telegramId,
        },


        data:{

          coins:{
            decrement:amount,
          },

        },

      });







    return new Response(

      JSON.stringify({

        success:true,

        coins:
          updated.coins.toString(),

      }),

      {
        headers:{
          "Content-Type":"application/json",
        },
      }

    );




  } catch(error) {


    console.error(
      "SPEND COINS ERROR:",
      error
    );



    return new Response(

      JSON.stringify({

        error:"Erro interno",

      }),

      {
        status:500,
        headers:{
          "Content-Type":"application/json",
        },
      }

    );

  }

}