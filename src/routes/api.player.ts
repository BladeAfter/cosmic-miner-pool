import { prisma } from "../lib/prisma";

export async function GET({ request }: any) {
  try {
    const url = new URL(request.url);

    const telegramId = url.searchParams.get("telegramId");

    if (!telegramId) {
      return new Response(
        JSON.stringify({
          error: "telegramId obrigatório",
        }),
        { status: 400 }
      );
    }


    const player = await prisma.player.findUnique({
      where: {
        telegramId: BigInt(telegramId),
      },
    });


    if (!player) {
      return new Response(
        JSON.stringify({
          error: "Jogador não encontrado",
        }),
        { status: 404 }
      );
    }


    return new Response(
      JSON.stringify({
        ...player,

        telegramId:
          player.telegramId.toString(),

        coins:
          player.coins.toString(),
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );


  } catch (error) {

    console.error(
      "GET PLAYER ERROR:",
      error
    );

    return new Response(
      JSON.stringify({
        error: "Erro interno",
      }),
      {
        status: 500,
      }
    );
  }
}



export async function POST({ request }: any) {

  try {

    const body = await request.json();


    const telegramId =
      body.telegramId
        ? BigInt(body.telegramId)
        : null;


    // Atualizar moedas do jogador
    if (body.id && body.coins !== undefined) {

      const player =
        await prisma.player.update({
          where: {
            id: Number(body.id),
          },

          data: {
            coins: BigInt(
              body.coins
            ),
          },
        });


      return new Response(
        JSON.stringify({
          ...player,

          telegramId:
            player.telegramId.toString(),

          coins:
            player.coins.toString(),
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }



    if (!telegramId) {

      return new Response(
        JSON.stringify({
          error: "telegramId obrigatório",
        }),
        {
          status:400,
        }
      );
    }



    const player =
      await prisma.player.upsert({

        where:{
          telegramId,
        },


        update:{

          username:
            body.username,

          firstName:
            body.firstName,

        },


        create:{

          telegramId,

          username:
            body.username,

          firstName:
            body.firstName,

          coins:0,

          level:1,

          energy:100,

        },

      });



    return new Response(

      JSON.stringify({

        ...player,

        telegramId:
          player.telegramId.toString(),

        coins:
          player.coins.toString(),

      }),

      {
        headers:{
          "Content-Type":
            "application/json",
        },
      }

    );


  } catch(error){

    console.error(
      "POST PLAYER ERROR:",
      error
    );


    return new Response(

      JSON.stringify({
        error:"Erro interno",
      }),

      {
        status:500,
      }

    );

  }

}