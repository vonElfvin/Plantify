import {User} from '../../users/shared/user';

export class Ad {
  $key?: string;
  author?: string;
  name?: string;
  title?: string;
  description?: string;
  image_path?: string;
  image: string;
  type?: string;
  profile_img_url?: string;
  image_url?: string;
  date_time?: any;
  price: number;
  deliveryCost: number;
  user?: User;
}
