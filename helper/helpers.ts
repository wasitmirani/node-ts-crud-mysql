
import { v4 as uuidv4, v6 as uuidv6 } from 'uuid';

export class helpers{
    
    // generate uuid for new rows
    get_uuid(){
        return uuidv4();
    }

}