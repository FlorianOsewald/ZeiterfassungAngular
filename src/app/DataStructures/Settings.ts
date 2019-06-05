import { ProgramState } from './ProgramState';

export class Settings {
    IsMaleAnrede: boolean;
    Name: string;
    State: ProgramState;

    toString() {
        return 'isMaleAnrede:' + this.IsMaleAnrede + '\tName:' + this.Name;
    }
}

