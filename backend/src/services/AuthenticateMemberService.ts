import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import Member from '../models/Member';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  member: Member;
  token: string;
}

// member.password = senha criptografada no banco
// password = senha nao criptografada

class AuthenticateMemberService {
  public async execute({ email, password }: Request): Promise<Response> {
    const membersRepository = getRepository(Member);

    const member = await membersRepository.findOne({
      where: { email },
    });

    if (!member) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await compare(password, member.password);
    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: member.id, // sempre o id do usuario
      // nao vai ter tempo de expiração enquanto desenvolvendo (NAO ME HACKEIA PLS)
    });

    return {
      member,
      token,
    };
  }
}

export default AuthenticateMemberService;
