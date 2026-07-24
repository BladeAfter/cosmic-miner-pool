import { prisma } from "../lib/prisma";


function formatPlayer(player: any) {
  return {
    ...player,

    telegramId:
      player.telegramId.toString(),

    coins:
      player.coins.toString(),
  };
}



export async function GET({ request }: any) {

  try {

    const url = new URL(request.url);

    const telegramId =
      url.searchParams.get("telegramId");


    if (!telegramId) {

      return new Response(
        JSON.stringify({
          error:"telegramId obrigatório",
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
          telegramId: BigInt(telegramId),
        },

      });



    if (!player) {

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



    return new Response(

      JSON.stringify(
        formatPlayer(player)
      ),

      {
        headers:{
          "Content-Type":"application/json",
        },
      }

    );


  } catch(error) {


    console.error(
      "GET PLAYER ERROR:",
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







export async function POST({ request }: any) {

  try {


    const body =
      await request.json();



    /*
      =========================
      SALVAR PROGRESSO
      =========================
    */


    if(
      body.telegramId &&
      body.coins !== undefined
    ) {


      const player =
        await prisma.player.update({

          where:{
            telegramId:
              BigInt(body.telegramId),
          },


          data:{


            coins:
              BigInt(body.coins),


            level:
              body.level !== undefined
              ? Number(body.level)
              : undefined,


            energy:
              body.energy !== undefined
              ? Number(body.energy)
              : undefined,


            skills:
              body.skills ?? undefined,


            owned:
              body.owned ?? undefined,


            missions:
              body.missions ?? undefined,


          },

        });



      return new Response(

        JSON.stringify(
          formatPlayer(player)
        ),

        {
          headers:{
            "Content-Type":"application/json",
          },
        }

      );

    }





    /*
      =========================
      CRIAR / BUSCAR JOGADOR
      =========================
    */


    if(!body.telegramId) {


      return new Response(

        JSON.stringify({
          error:"telegramId obrigatório",
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


          coins:
            BigInt(0),


          level:
            1,


          energy:
            100,


          skills:
            [],


          owned:
            [],


          missions:
            [],


        },

      });





    return new Response(

      JSON.stringify(
        formatPlayer(player)
      ),

      {
        headers:{
          "Content-Type":"application/json",
        },
      }

    );



  } catch(error) {


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
        headers:{
          "Content-Type":"application/json",
        },
      }

    );

  }

}