import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// A `main` function so that you can use async/await
async function main() {
  // ... you will write your Prisma Client queries here
  
  /*
  INSERT
  const post = await prisma.post.create({
    data: {
      title: 'Prisma makes database easy',
      author: {
        connect: { email: 'sarah@prisma.io'},
      },
    },
  })
  */

  /**
   * インサートするためのデータを作る
   * Prismaで勝手に作ってくれたTypeでデータを整理する
   */
  let u: Prisma.UserCreateInput
  u = {
    email:'ddd',
    profile : { //リレーションのレコードはこんな感じでネストで記述できる
      create : {
        bio : 'BioBioBio', 
      }
    }
  }
  console.log(u)

  /**
   * createに渡す
   */
  const us = await prisma.user.create({data:u})

  /**
  { id: 1, email: 'aaa', name: null, posts: [], profile: null },
  {
    id: 2,
    email: 'bbb',
    name: null,
    posts: [],
    profile: { id: 1, bio: 'BioBioBio', userId: 2 }
  },
   */


  /*
  UPDATE
  */
 /*
  const post = await prisma.post.update({
    where: {id: 2},
    data: { published: true}
  })
  console.log(post)
*/

  /*
  SELECT
  */
  const allUsers = await prisma.user.findMany(
    {
      include: { posts: true, profile:true} //リレーションのレコードも出力するときはIncludeで指定する
    }
  )
  console.dir(allUsers, { depth: null })
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
