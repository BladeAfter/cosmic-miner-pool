import { prisma } from "../../lib/prisma";


function formatPlayer(player: any) {

  return {

    ...player,

    telegramId:
      player.telegramId.toString(),

    coins:
      player.coins.toString(),

  };

}



export async function POST({ request }: any) {

  try {


    const body =
      await request.json();



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


          coins:
            body.coins !== undefined
            ? BigInt(body.coins)
            : undefined,



          level:
            body.level !== undefined
            ? Number(body.level)
            : undefined,



          energy:
            body.energy !== undefined
            ? Number(body.energy)
            : undefined,



          skills:
            body.skills !== undefined
            ? body.skills
            : undefined,



          owned:
            body.owned !== undefined
            ? body.owned
            : undefined,



          missions:
            body.missions !== undefined
            ? body.missions
            : undefined,


        },



        create:{


          telegramId,


          coins:
            BigInt(body.coins ?? 0),


          level:
            Number(body.level ?? 1),


          energy:
            Number(body.energy ?? 100),


          skills:
            body.skills ?? [],


          owned:
            body.owned ?? [],


          missions:
            body.missions ?? [],


        },


      });







    return new Response(

      JSON.stringify({

        success:true,

        player:
          formatPlayer(player),

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

        error:"erro ao salvar",

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