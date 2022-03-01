import { User } from '../../models/userModel';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { getHashCache, setHashCache } from '../../redis';

export class AuthService {
  private static instance: AuthService;

  public static get Instance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async register(userData: User): Promise<User> {
    try {
      let user = await getHashCache(userData.username);
      if (!user) {
        const token = this._generateAuthToken(userData.username);
        userData.accessToken = token;
        await setHashCache(userData.username, userData);

        user = userData;
      } else {
        if (userData.password !== user.password) {
          throw new Error('Wrong Password');
        }
      }
      return user;
    } catch (error) {
      console.log(error);
    }
  }

  _generateAuthToken(username: string) {
    const { jwtSecret } = config;
    const token = jwt.sign(
      {
        id: username,
      },
      jwtSecret,
    );
    return token;
  }
}
