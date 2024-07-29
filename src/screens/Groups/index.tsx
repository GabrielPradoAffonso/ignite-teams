import { Alert, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { Header } from '../../components/Header';
import { HighLight } from '../../components/Highlights';
import { GroupCard } from '../../components/GroupCard';
import { ListEmpty } from '../../components/ListyEmpty'

import { Container } from './styles';
import { useState, useCallback } from 'react';
import { Button } from '../../components/Button';
import { GroupsGetAll } from '../../storage/groupsGetAll';
import { Loading } from '../../components/Loading';

export function Groups() {
  const [ isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState([]);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate('new');
  }

  async function fetchGroups() {
    try {
      setIsLoading(true);
      const data = await GroupsGetAll();
      setGroups(data);
     
    } catch (error) {
      console.log(error);
      Alert.alert('Turmas', 'Não foi possível carregar as turms');
    } finally {
      setIsLoading(false);
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group})
  }

  useFocusEffect(
    useCallback(() => {
      fetchGroups();
    }, [])
  );

  return (
    <Container>
      <Header />
      <HighLight 
        title='Turmas'
        subtitle='Jogue com a sua turma'
      />

    { isLoading ? <Loading /> :
      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <GroupCard title={item} 
          onPress={() => handleOpenGroup(item)}
          />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message='Que tal cadastrar a primeira turma?' />
        )}
        showsVerticalScrollIndicator={false}
      />
    }

      <Button 
        title='Criar nova turma'
        onPress={handleNewGroup}
      />
    </Container>
  );
}
