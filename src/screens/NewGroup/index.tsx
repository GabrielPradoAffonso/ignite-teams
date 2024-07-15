import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'
import { HighLight } from '../../components/Highlights'
import { Input } from '../../components/Input'

import { Container, Content, Icon } from './styles'

export function NewGroup() {
  const [ group, setGroup] = useState('')

  const navigation = useNavigation(); 
  function handleNew() {
    navigation.navigate('players', { group })
  }

  return (
    <Container>
      <Header showBackButton/>
      <Content>
        <Icon />
        <HighLight 
          title='Nova Turma'
          subtitle='Cria uma turma para adicionar pessoas'
        />

        <Input 
          placeholder='Nome da turma'
          onChangeText={setGroup}
        />

        <Button 
          title='Criar'
          style={{marginTop: 20}}
          onPress={handleNew}
        />
      </Content>
    </Container>
  )
}