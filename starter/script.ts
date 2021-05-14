import { PrismaClient } from '@prisma/client'

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

  /*
  UPDATE
  */
  const post = await prisma.post.update({
    where: {id: 2},
    data: { published: true}
  })
  console.log(post)

  /*
  SELECT
  */
  const allUsers = await prisma.user.findMany({
    include: { posts: true }
  })
  console.dir(allUsers, { depth: null })
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
