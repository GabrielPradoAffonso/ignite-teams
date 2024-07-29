import { Container, Form, HeaderList, NumberOfPlayers} from "./styles";

import { Alert, FlatList, TextInput } from "react-native";

import { ButtonIcon } from "../../components/ButtonIcon";
import { Filter } from "../../components/Filter";
import { Header } from "../../components/Header";
import { HighLight } from "../../components/Highlights";
import { Input } from "../../components/Input";
import { PlayerCard } from "../../components/PlayerCard";
import { ListEmpty } from "../../components/ListyEmpty";
import { Button } from "../../components/Button";

import { useState, useEffect, useRef } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { AppError } from "../../utils/AppError";

import { playerAddByGroup } from "../../storage/players/playerAddByGroup";
import { playerGetByGroupAndTeam } from "../../storage/players/playerGetByGroupAndTeam";
import { PlayerStorageDTO } from "../../storage/players/playerStorageDTO";
import { playerRemoveByGroup } from "../../storage/players/playerRemoveByGroup";
import { groupRemoveByName } from "../../storage/Group/groupRemoveByName";
import { Loading } from "../../components/Loading";

type RouteParams = {
  group: string
}

export function Players() {
  const [ isLoading, setIsLoading] = useState(true);
  const [ newPlayerName, setNewPlayerName] = useState('')
  const [team, setTeam] = useState('Time A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  const navigation = useNavigation()
  const route = useRoute()
  const { group } = route.params as RouteParams

  const newPlayerNameInputRef = useRef<TextInput>(null)

  async function handleAddPlayer() {
    if(newPlayerName.trim().length === 0) {
      return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar')
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {
      await playerAddByGroup(newPlayer, group);
  
      newPlayerNameInputRef.current?.blur();
      setNewPlayerName('');
      fetchPlayersByTeam();    
    } catch (error) {
      if(error instanceof AppError) {
        Alert.alert('Nova pessoa', error.message)
      } else {
        console.log(error)
        Alert.alert('Nova pessoa', 'Não foi possível adicionar')
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      setIsLoading(true);
      const playersByTeam = await playerGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
      
    } catch (error) {
      console.log(error);
      Alert.alert('Pessoas', 'Não foi possível carregar os usuários')
    } finally {
      setIsLoading(false)
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (error) {
      console.log(error)
      Alert.alert('Remover usuário', 'Não foi possível remover esse usuário')
    }
  } 

  function confirmRemovePlayer(playerName: string) {
    Alert.alert(
      "Remover usuário",
      "Tem certeza que deseja remover esse usuário?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Remover",
          onPress: () => handlePlayerRemove(playerName)
        }
      ]
    );
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group)
      navigation.navigate('groups');

    } catch (error) {
      console.log(error);
      Alert.alert('Remover Grupo', 'Não foi possível remover esse grupo')
    }
  }

  async function handleGroupRemove() {
    Alert.alert(
      "Remover Grupo",
      "Tem certeza que deseja remover esse grupo?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Remover", onPress: () => groupRemove() }
      ]
    );
  }

  useEffect(() => {
    fetchPlayersByTeam()
  }, [team])

  return (  
    <Container>
      <Header showBackButton />

      <HighLight
        title={group}
        subtitle="Adicione a galera e separe os times"
      />
      
      <Form>
        <Input 
          inputRef={newPlayerNameInputRef}
          placeholder="Nome do membro"
          autoCorrect={false}
          autoCapitalize='sentences'
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />

        <ButtonIcon icon="add" onPress={handleAddPlayer}/>
      </Form>
      
      <HeaderList>
        <FlatList 
          data={['Time A', 'Time B']}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <Filter 
              title={item}
              onPress={() => setTeam(item)}
              isActive={item === team}
            />
          )}
          horizontal
        />

        <NumberOfPlayers>
          {players.length}
        </NumberOfPlayers>
      </HeaderList>

      { isLoading ? <Loading /> :
      <FlatList 
        data={players}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <PlayerCard 
            name={item.name} 
            onRemove={() => confirmRemovePlayer(item.name)}
          />
        )}
        showsVerticalScrollIndicator={false}

        ListEmptyComponent={() => (
          <ListEmpty message='Não há pessoas nesse time!'/>
        )}
        contentContainerStyle={[
          { paddingBottom: 32},
          players.length === 0 && {flex: 1}
        ]}
      />
    }

      <Button 
        title="Remover Turma"
        type="SECONDARY"
        onPress={handleGroupRemove}
      />

    </Container>
  );
}
