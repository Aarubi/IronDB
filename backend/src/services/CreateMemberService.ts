import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import Member from '../models/Member';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateMemberService {
  public async execute({ name, email, password }: Request): Promise<Member> {
    const membersRepository = getRepository(Member);

    const checkMemberExists = await membersRepository.findOne({
      where: { email },
    });

    if (checkMemberExists) {
      throw new AppError('Email already used', 400);
    }
    const hashedPassword = await hash(password, 8);

    const member = membersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await membersRepository.save(member);

    return member;
  }
}

export default CreateMemberService;
