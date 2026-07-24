import { prisma } from "../../lib/prisma";

export async function POST({ request }: any) {
  try {

    const body = await request.json();


    if (!body.id) {
      return new Response(
        JSON.stringify({
          error: "id do jogador obrigatório",
        }),
        {
          status:400,
          headers:{
            "Content-Type":"application/json",
          },
        }
      );
    }


    const player = await prisma.player.update({

      where:{
        id: Number(body.id),
      },


      data:{


        coins:
          BigInt(body.coins ?? 0),


        level:
          Number(body.level ?? 1),


        energy:
          Number(body.energy ?? 100),


        skills:
          body.skills ?? undefined,


        owned:
          body.owned ?? undefined,


        missions:
          body.missions ?? undefined,


      },

    });



    return new Response(

      JSON.stringify({

        success:true,

        coins:
          player.coins.toString(),

        level:
          player.level,

      }),

      {
        headers:{
          "Content-Type":"application/json",
        },
      }

    );



  } catch(error){


    console.error(
      "SAVE PLAYER ERROR:",
      error
    );



    return new Response(

      JSON.stringify({

        error:"erro ao salvar"

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