import { User } from '../../models/userModel';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../../config';
import { getCache, setCache, clearCache, getHashCache, setHashCache } from '../../redis';

export class AuthService {
  private static instance: AuthService;

  public static get Instance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async register(userData: User): Promise<void> {
    try {
      console.log('in route register');
      let user = await getHashCache(userData.username);
      if (!user) {
        console.log('heree');
        const userId = uuidv4();
        const token = this._generateAuthToken(userId);
        userData.accessToken = token;
        await setHashCache(userData.username, userData);

        user = userData;
      }
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  _generateAuthToken(id: string) {
    const { jwtSecret } = config;
    console.log('id ===== ', id, jwtSecret);
    const token = jwt.sign(
      {
        id: id,
      },
      jwtSecret,
    );
    return token;
  }
}
