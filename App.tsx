/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Image,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import {TamaguiProvider, createTamagui} from '@tamagui/core';
import {defaultConfig} from '@tamagui/config/v4';
import {
  Button,
  Card,
  Input,
  SizableText,
  XStack,
  Adapt,
  Dialog,
  Sheet,
  Unspaced,
  TextArea,
  Text,
  Popover,
  Label,
  PopoverProps,
  YStack
} from 'tamagui';
import { PortalProvider } from '@tamagui/portal'
import {
  addTodo,
  deleteTodo,
  searchTodo,
  sortNameAscending,
  sortNameDescending,
  sortPriorityAscending,
  sortPriorityDescending,
  updateComplete,
  updateTodo,
} from './redux/action';

import {useSelector, useDispatch} from 'react-redux';

type SectionProps = PropsWithChildren<{
  title: string;
}>;
const config = createTamagui(defaultConfig);

type Conf = typeof config;

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}

function ToolBar({
  Icon,
  Name,
  shouldAdapt,
  id,
  ...props
}: PopoverProps & { Icon?: any; Name?: string; shouldAdapt?: boolean, id?: any}) {
  const dispatch = useDispatch();
  return (
    <Popover size="$5" allowFlip {...props}>
      <Popover.Trigger asChild>
        <Button style={{backgroundColor:'transparent'}}> <Image source={require('./assets/dropdown.png')} /></Button>
      </Popover.Trigger>

      {shouldAdapt && (
        <Adapt when="sm" platform="touch">
          <Popover.Sheet animation="medium" modal dismissOnSnapToBottom>
            <Popover.Sheet.Frame padding="$4">
              <Adapt.Contents />
            </Popover.Sheet.Frame>
            <Popover.Sheet.Overlay
              backgroundColor="$shadowColor"
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Popover.Sheet>
        </Adapt>
      )}

      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        enterStyle={{ y: -10, opacity: 0 }}
        exitStyle={{ y: -10, opacity: 0 }}
        elevate
        animation={[
          'quick',
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
      >
        <Popover.Arrow borderWidth={1} borderColor="$borderColor" />

  
      

          <Popover.Close asChild>
            <View style={{width:"100%"}}>
            <Button
            style={{backgroundColor:"transparent"}}
       
              onPress={() => {
                /* Custom code goes here, does not interfere with popover closure */
              }}
            >
             Edit
            </Button>
            <View style={{borderWidth:1, borderTopColor:"black", width:"100%"}}/>
            <Button
            style={{backgroundColor:"transparent"}}
              onPress={()=>{
                dispatch(deleteTodo(id));
              }}
            >
             Delete
            </Button>
            </View>
           
          </Popover.Close>
  
      </Popover.Content>
    </Popover>
  )
}


function DialogInstance({ disableAdapt }: { disableAdapt?: boolean }) {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");


  const dispatch = useDispatch();


  return (
    <Dialog modal>
      <Dialog.Trigger asChild>
      <Button
            elevate
            color={'white'}
            style={{
              position: 'absolute',
              right: 20, // Distance from the right edge of the screen
              bottom: 10, // Distance from the bottom edge of the screen
              borderRadius: 500, // Makes the button circular
              width: 'auto', // Width of the FAB
              height: 60, // Height of the FAB
              justifyContent: 'center',
              alignItems: 'center',
              padding: 0, // Optional: Removes any inner padding
              backgroundColor: '#EC5F5F',
            }}>
            <Image source={require('./assets/add.png')} />
            Add task
            {disableAdapt ? ` (No Adapt)` : ''}</Button>
      </Dialog.Trigger>

      {!disableAdapt && (
        <Adapt when="sm" platform="touch">
          <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
            <Sheet.Frame padding="$4" gap="$4">
              <Adapt.Contents />
            </Sheet.Frame>
            <Sheet.Overlay
              animation="lazy"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
          </Sheet>
        </Adapt>
      )}

      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="slow"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Dialog.Content
        width={"100%"}
          bordered
          elevate
          key="content"
          animateOnly={['transform', 'opacity']}
          animation={[
            'quicker',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
        >
          <Dialog.Title>
            <SizableText fontWeight={600} fontSize={20}>Add Task</SizableText>
          </Dialog.Title>
       
          
            <SizableText width={"100%"}>
              Name
            </SizableText>
            <Input id="name" placeholder="Name"  value={name}
          onChangeText={value => setName(value)}/>
        
            <SizableText width={"100%"} >
              Description
            </SizableText>
            <TextArea textAlignVertical='top' lineHeight={10} id="name" placeholder="Description" height={100} value={description}
          onChangeText={value => setDescription(value)}/>
            <SizableText width={"100%"}>
              Due Date
            </SizableText>
            <View style={{ position: 'relative', width: '100%' }}>
        <Input
          id="name"
          placeholder="12 October, 2023"
          style={{
            width: '100%',
            // paddingRight: 40,  // Space for the image inside the input
          }}
          value={date}
          // onChange={event => setTask(event.nativeEvent.target.value)}
          onChangeText={value => setDate(value)}
        />
        <Image
          source={require('./assets/calendar.png')}
          style={{
            position: 'absolute',
            right: 10,  // Position the image at the right side of the input
            top: '50%',  // Vertically center the image
            transform: [{ translateY: -12 }],  // Adjust to align the image properly with the text
            // width: 20,  // Set the size of the image
            height: 20,  // Set the size of the image
            resizeMode: 'contain',  // Maintain aspect ratio of the image
          }}
        />
      </View>

 
            <Dialog.Close displayWhenAdapted asChild>
              <Button onPress={()=>{
                dispatch(addTodo(name, description,date));
            setName("")
            setDescription("")
            setDate("");
              }} style={{backgroundColor:"#EC5F5F"}} color={"white"} aria-label="Close">
                Save
              </Button>
            </Dialog.Close>
       

          <Unspaced>
            <Dialog.Close asChild>
              <Button
                position="absolute"
                top="$3"
                right="$3"
                size="$2"
                circular
                transparent
                // icon={X}
              >
                 <Image source={require('./assets/close.png')} />
                </Button>
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}

function App(): React.JSX.Element {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const todoList = useSelector(state =>state.todos);

  const filteredList = useSelector(state =>state.filtered);


useEffect(()=>{
  console.log('list',todoList)
},[])


  return (

    <TamaguiProvider config={config}>
          <PortalProvider shouldAddRootHost>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '5%',
              marginBottom: '5%',
            }}>
            <Image source={require('./assets/logo.png')} />
          </View>
       

          <View style={{alignItems: 'center'}}>
            <Input
              size="$6"
              borderWidth={2}
              placeholder="Search"
              style={{backgroundColor: '#F6F7FA'}}
              width={'90%'}
              value={search}
              onChangeText={value=> {
                
                setSearch(value)
                dispatch(searchTodo(value))}}
            />
            <Button
              elevate
              style={{
                backgroundColor: '#EC5F5F',
                position: 'absolute',
                right: 30,
                top: '15%',
                alignItems: 'center',
                justifyContent: 'center',
                width: 44,
                height: 44,
                borderRadius: 12,
              }}>
              <Image
                source={require('./assets/search.png')}
                style={{resizeMode: 'contain'}}
              />
            </Button>
          </View>
          <ScrollView contentInsetAdjustmentBehavior="automatic" style={{backgroundColor:"white"}}>
            <View
              style={{
                justifyContent: 'flex-start',
                alignContent: 'flex-start',
                alignItems: 'flex-start',
              }}>
              <SizableText
                fontSize={18}
                fontWeight={700}
                marginStart={25}
                style={{marginTop: 25, marginBottom: 15}}>
                All Task
              </SizableText>
            </View>

            

            <View
              style={{
                justifyContent: 'center', // Centers vertically
                alignItems: 'center', // Centers horizontally
              }}>
     
             {search!== "" ? filteredList?.map((todo: any) => (  <View style={{marginBottom: '3%'}}>
              <Card
                elevate
                size="$4"
                width="90%"
                style={{backgroundColor: '#F6F7FA'}} id={(todo.id.toString()) + "1"}>
                <Card.Header padded>
                  <View
                    style={{
                      flexDirection: 'row', // Set layout to row to align items horizontally
                      justifyContent: 'space-between', // Align items at start and end
                      alignItems: 'center', // Vertically center items
                      width: '100%',
                    }}>
                    <SizableText fontWeight={600} fontSize={16}>
                     {todo.name}
                    </SizableText>
                    
                      <ToolBar placement='left' id={todo.id}/>
                  </View>
                  <SizableText
                    color={'8C8C8C'}
                    fontSize={14}
                    fontWeight={400}
                    theme="alt2">
                   {todo.description}
                  </SizableText>
                </Card.Header>
                <Card.Footer paddingEnd={10} paddingBlockEnd={10}>
                  <XStack flex={1} />
                  <SizableText
                    fontWeight={400}
                    color={'#C7C9D9'}
                    fontSize={14}>
                      {todo.date}
                  </SizableText>
                </Card.Footer>
              </Card>
            </View>)) : todoList?.map((todo: any) => (  <View style={{marginBottom: '3%'}}>
              <Card
                elevate
                size="$4"
                width="90%"
                style={{backgroundColor: '#F6F7FA'}} id={(todo.id.toString())}>
                <Card.Header padded>
                  <View
                    style={{
                      flexDirection: 'row', // Set layout to row to align items horizontally
                      justifyContent: 'space-between', // Align items at start and end
                      alignItems: 'center', // Vertically center items
                      width: '100%',
                    }}>
                    <SizableText fontWeight={600} fontSize={16}>
                     {todo.name}
                    </SizableText>
                    
                      <ToolBar placement='left' id={todo.id}/>
                  </View>
                  <SizableText
                    color={'8C8C8C'}
                    fontSize={14}
                    fontWeight={400}
                    theme="alt2">
                   {todo.description}
                  </SizableText>
                </Card.Header>
                <Card.Footer paddingEnd={10} paddingBlockEnd={10}>
                  <XStack flex={1} />
                  <SizableText
                    fontWeight={400}
                    color={'#C7C9D9'}
                    fontSize={14}>
                      {todo.date}
                  </SizableText>
                </Card.Footer>
              </Card>
            </View>))}
            
             
            </View>
          </ScrollView>

          {/* <Button
            elevate
            color={'white'}
            style={{
              position: 'absolute',
              right: 20, // Distance from the right edge of the screen
              bottom: 10, // Distance from the bottom edge of the screen
              borderRadius: 500, // Makes the button circular
              width: 'auto', // Width of the FAB
              height: 60, // Height of the FAB
              justifyContent: 'center',
              alignItems: 'center',
              padding: 0, // Optional: Removes any inner padding
              backgroundColor: '#EC5F5F',
            }}>
            <Image source={require('./assets/add.png')} />
            Add task
          </Button> */}
             <DialogInstance/>
        </View>
      </SafeAreaView>
      </PortalProvider>
    </TamaguiProvider>
  
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
