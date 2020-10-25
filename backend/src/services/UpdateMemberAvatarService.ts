/**
 *
 *


import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import Member from '../models/Member';
import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';

interface Request {
  memberId: string;
  avatarFilename: string;
}

class UpdateMemberAvatarService {
  public async execute({ memberId, avatarFilename }: Request): Promise<Member> {
    const membersRepository = getRepository(Member);

    const member = await membersRepository.findOne(memberId);

    if (!member) {
      throw new AppError('Only authenticated members can change avatar.', 401);
    }
    if (member.avatar) {
      const memberAvatarFilePath = path.join(
        uploadConfig.directory,
        member.avatar
      );
      const avatarFileExists = await fs.promises.stat(memberAvatarFilePath);

      if (avatarFileExists) {
        await fs.promises.unlink(memberAvatarFilePath);
      }
    }
    member.avatar = avatarFilename;

    await membersRepository.save(member);

    return member;
  }
}

export default UpdateMemberAvatarService;

// Precisa revisar.
*/
