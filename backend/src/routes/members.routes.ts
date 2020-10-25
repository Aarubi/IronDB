import { Router } from 'express';
// import multer from 'multer';

import CreateMemberService from '../services/CreateMemberService';
// import UpdateMemberAvatarService from '../services/UpdateMemberAvatarService';
// import ensureAuthenticated from '../middlewares/ensureAuthenticated';
// import uploadConfig from '../config/upload';

const membersRouter = Router();
// const upload = multer(uploadConfig);

membersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createMember = new CreateMemberService();

  const member = await createMember.execute({
    name,
    email,
    password,
  });

  delete member.password;

  return response.json(member);
});

export default membersRouter;
