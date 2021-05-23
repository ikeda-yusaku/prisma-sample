import { Prisma, PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

/**
 * エンティティ
 * 一応ビジネスロジックを書くために作る
 * Prismaの生成されたモデルを極力採用したいので
 * CreateInputとUpdateInputとUserをそれぞれほじするようにする
 */
class UserEntity {

  createInput: Prisma.UserCreateInput | undefined
  updateInput: Prisma.UserUpdateInput | undefined
  data:User | undefined

  constructor(createInput?:Prisma.UserCreateInput | undefined, updateInput?:Prisma.UserUpdateInput | undefined, data?:User | undefined) {
    if (createInput != null) {
      this.createInput = createInput
    }

    if (updateInput != null) {
      this.updateInput = updateInput
    }

    if (data != null) {
      this.data = data
    }
  }
  validate(): boolean {
    return true
  }
}

/**
 * UserDataGateway
 * ユーザーに関する操作のインターフェース
 */
interface iUserDataGateWay {
  AddNewUser(data:UserEntity):Promise<User | undefined>
}

/**
 * UserDataAccess
 * ユーザーに関する操作の実態、Gatewayを継承する
 * Prismaの処理を呼び出すことにする
 */
class UserDataAccess implements iUserDataGateWay {
  async AddNewUser(user: UserEntity): Promise<User | undefined> {
    user.validate()
    if (user.createInput != undefined) {
      const u = await prisma.user.create({data:user.createInput!})
      return u
    }
    return undefined
  }
}

/**
 * UserUsecaseInteractor
 */
class UserUsecaseInteractor {
  public async handle() {
    let u : Prisma.UserCreateInput = {
      email : "nnnnnn"
    }
    let us = new UserEntity(u)
    let uda = new UserDataAccess() //本来はDIを使って処理する流れを掴むために省略
    await uda.AddNewUser(us)
  }
}



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
  /*let u: Prisma.UserCreateInput
  u = {
    email:'ddd',
    profile : { //リレーションのレコードはこんな感じでネストで記述できる
      create : {
        bio : 'BioBioBio', 
      }
    }
  }
  console.log(u)
*/

  /**
   * createに渡す
   */
  //const us = await prisma.user.create({data:u})


  var a:UserUsecaseInteractor = new UserUsecaseInteractor()
  await a.handle()

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
