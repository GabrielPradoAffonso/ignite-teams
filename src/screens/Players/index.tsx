import { Container, Form, HeaderList, NumberOfPlayers} from "./styles";

import { FlatList } from "react-native";

import { ButtonIcon } from "../../components/ButtonIcon";
import { Filter } from "../../components/Filter";
import { Header } from "../../components/Header";
import { HighLight } from "../../components/Highlights";
import { Input } from "../../components/Input";
import { PlayerCard } from "../../components/PlayerCard";
import { ListEmpty } from "../../components/ListyEmpty";
import { Button } from "../../components/Button";

import { useState } from "react";
import { useRoute } from "@react-navigation/native";

type RouteParams = {
  group: string
}

export function Players() {
  const [team, setTeam] = useState('Time 1')
  const [players, setPlayers] = useState([])

  const route = useRoute()
  const { group } = route.params as RouteParams

  return (  
    <Container>
      <Header showBackButton />

      <HighLight
        title={group}
        subtitle="Adicione a galera e separe os times"
      />
      
    <Form>
      <Input 
        placeholder="Nome do membro"
        autoCorrect={false}
        autoCapitalize='sentences'
      />

      <ButtonIcon icon="add"/>
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

    <FlatList 
      data={players}
      keyExtractor={item => item}
      renderItem={({ item }) => (
        <PlayerCard name={item} onRemove={() => {}}/>
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

      <Button 
        title="Remover Turma"
        type="SECONDARY"
      />

    </Container>
  );
}