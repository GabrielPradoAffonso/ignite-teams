import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppError } from "../../utils/AppError";

import { PLAYER_COLLECTION } from '../storageConfig'
import { playerGetByGroup } from "./playerGetByGroup";
import { PlayerStorageDTO } from "./playerStorageDTO";

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string){
  try {
    const storedPlayers = await playerGetByGroup(group)
    const playerAlreadyAdded = storedPlayers.filter(player => player.name === newPlayer.name)
    
    if(playerAlreadyAdded.length > 0) {
      throw new AppError('Essa pessoa já foi adicionada em algum time')
    }

    const storage = JSON.stringify([...storedPlayers, newPlayer]);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage)
  } catch(error) {
    throw (error); 
  }
}