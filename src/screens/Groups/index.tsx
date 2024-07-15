import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import { Header } from '../../components/Header';
import { HighLight } from '../../components/Highlights';
import { GroupCard } from '../../components/GroupCard';
import { ListEmpty } from '../../components/ListyEmpty';

import { Container } from './styles';
import { useState } from 'react';
import { Button } from '../../components/Button';



export function Groups() {
  const [groups, setGroups] = useState([]);

  const navigation = useNavigation();

  function handleNewGroup(){
    navigation.navigate('new')
  }

  return (
    <Container>
      <Header/>
      <HighLight 
        title='Turmas'
        subtitle='Jogue com a sua turma'
      />

      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard 
            title={item} 
          />
        )}

        contentContainerStyle={groups.length === 0 && {
          flex: 1,
        }}

        ListEmptyComponent={() => (
          <ListEmpty message='Que tal cadastrar a primeira turma?'/>
        )}
        showsVerticalScrollIndicator={false}
      />

      <Button 
        title='Criar nova turma'
        onPress={handleNewGroup}
      />

    </Container>
  );
}
