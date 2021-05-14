import React , { useEffect , useState} from 'react';
import { TouchableOpacity, View, Dimensions, FlatList , Modal ,TextInput , ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const DashboardScreen = (props) => {

    const [Data , setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [name , setName] = useState("")
    const [actor , setActor] = useState("")
    const [isloading, setIsLoading] = useState(false)
    const [key , setKey] = useState("")
    const [editable , setEditable] = useState(false)


    useEffect(() => {
        fetchMovies();
        // console.log("Hello world");
    }, [])

    const addMovie = async (name , hero) => {    
        
        setIsLoading(true)

        const response = await fetch("https://one-for-life-default-rtdb.firebaseio.com/movies.json" , {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                username: props.navigation.state.params.username,
                name: name,
                hero: hero
            })
        })

        const data = await response.json();

        setIsLoading(false)
        // console.log(data);
    }

    const submitHandler = async () => {
        console.log(name);
        console.log(actor);
       await addMovie(name , actor);
        fetchMovies();
    }

    const fetchMovies = async () => {
        setIsLoading(true);
        const response = await fetch("https://one-for-life-default-rtdb.firebaseio.com/movies.json")

        const data = await response.json();
        setIsLoading(false);

        let arr = []

        for(var key in data) {
            // console.log(key);
            
            data[key].key = key
            // console.log(data[key]);
    
            arr.push(data[key])
    
        }

        setData(arr);


        // console.log("FIANLA DATA");

        // console.log(Data);
    }

    const updateMovies = async (name , actor , key) => {

        var d = new Date();

        const response = await fetch(`https://one-for-life-default-rtdb.firebaseio.com/movies/${key}.json` , {
            method: "PATCH",
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                username: props.navigation.state.params.username,
                name: name,
                hero: actor,
            })
        })

        const data = await response.json();

        setName("")
        setActor("")
        setKey("")
        // console.log(data);
    }

    const deleteMovies = async (id) => {
        const response = await fetch(`https://one-for-life-default-rtdb.firebaseio.com/movies/${id}.json` , {
            method: "DELETE",
        })

        const data = await response.json();
        // console.log(data);
    }
    
    const deleteHandler = (id) => {
        // console.log(id);
        deleteMovies(id);
        fetchMovies();
    }

    const editHandler = (name , hero , key) => {
        setName(name)
        setActor(hero)
        setKey(key)
        setEditable(true)
        setModalVisible(true)
    }


  return (
      <View style = {{ }}>
          <View style={{alignItems: "center" , marginTop: 10 , marginBottom: 15}}>
              <Text style ={{
                  fontSize: 22,
                  fontWeight: "bold"
              }}>Hello {props.navigation.state.params.username} </Text>
          </View>

          { 
           isloading ?  <ActivityIndicator size="large" color="#00ff00"  /> :

          <View style={{ alignItems: "center" , marginBottom: 10}}>
          <FlatList
            data={Data}
            style={{}}
            renderItem={(item) => (
                <View>
                    <View style={{width:windowWidth/1.1 , flexDirection: "row" , backgroundColor: "white" , alignItems: "center" , marginBottom: 10 , justifyContent: "center" , borderRadius:10}}>
                    <View style={styles.row}>
                        <Text style={{fontSize: 15}}>{item.item.name}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={{fontSize: 15}}>{item.item.hero}</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        deleteHandler(item.item.key);
                    }}>
                    <View style={{backgroundColor: "red" , marginLeft: 20 , borderRadius: 10}}>
                        <Text style={{color: "white"}}>   DELETE   </Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        editHandler(item.item.name , item.item.hero , item.item.key);
                    }}>
                    <View style={{backgroundColor: "green" , marginLeft: 10 , borderRadius: 10}}>
                        <Text style={{color: "white"}}>   EDIT   </Text>
                    </View>
                    </TouchableOpacity>
                    </View>
                </View>
            )}
          />
          </View>

            }

              <TouchableOpacity style={{alignItems: "center"}} onPress={() => {
                //   addMovie();
                // fetchMovies();
                // updateMovies();
                // deleteMovies();
                setModalVisible(true);
              }}>
                <View style= {{backgroundColor: "blue", width: windowWidth/1.8, height: windowHeight/20, borderRadius: 20, alignItems: "center" , justifyContent: "center" }}>
                    <Text style={{ fontSize: 18 ,color : "white"}}>Add more movies</Text>
                </View>
              </TouchableOpacity>

             <Modal
                transparent={true}
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false)
                }}
            >
                <View style={{ flex: 1 , alignItems: "center" , justifyContent: "center"}}>
                    <View style={{width: windowWidth/1.2 , height: windowHeight/2 , backgroundColor:"pink" , borderRadius: 20 , alignItems: "center" , justifyContent: "center" }}>
                        
                    <View style={{alignItems: "center" , justifyContent: "center"}}>
                        <View style={{margin : 10}}>
                          <Text style={{fontWeight: "bold" , fontSize: 18}}>Enter Movie Name</Text>
                        </View>
                        <TextInput
                         style={styles.input}
                         onChangeText={(val) => {
                            setName(val)
                         }}
                         placeholder="Movie Name"
                         value={name}
                        />
                    </View>

                    <View style={{alignItems: "center" , justifyContent: "center"}}>
                        <View style={{margin : 10}}>
                          <Text style={{fontWeight: "bold" , fontSize: 18}}>Enter Lead Actor Name</Text>
                        </View>
                        <TextInput
                         style={styles.input}
                         onChangeText={(val) => {
                            setActor(val)
                         }}
                         placeholder="Actor Name"
                         value={actor}
                        />
                    </View>

                    {/* {name.length > 0 && actor.length > 0 ? ( editable ? 
                        <TouchableOpacity style={{alignItems: "center" , marginTop: 40}} onPress={() => {
                            // submitHandler();
                            updateMovies(name , actor ,  key);
                            fetchMovies();
                            setModalVisible(false);
                          }}>
                            <View style= {{backgroundColor: "orange", width: windowWidth/1.8, height: windowHeight/20, borderRadius: 20, alignItems: "center" , justifyContent: "center" }}>
                                <Text style={{ fontSize: 18 ,color : "white" , fontWeight: "bold"}}>EDIT</Text>
                            </View>
                          </TouchableOpacity> : 

                        <TouchableOpacity style={{alignItems: "center" , marginTop: 40}} onPress={() => {
                            submitHandler();
                            setModalVisible(false);
                          }}>
                            <View style= {{backgroundColor: "orange", width: windowWidth/1.8, height: windowHeight/20, borderRadius: 20, alignItems: "center" , justifyContent: "center" }}>
                                <Text style={{ fontSize: 18 ,color : "white" , fontWeight: "bold"}}>SAVE</Text>
                            </View>
                          </TouchableOpacity> )
                          : 
                          <View /> 
                    } */}

            

                    </View>
                </View>
                
                </Modal>

      </View>
  );
};

const styles = StyleSheet.create({ 
    row: {
        margin : 5
    },
    input: {
        width : windowWidth/1.8,         
        height: windowHeight/20,
        borderRadius:8,
        borderWidth: 1,
        textAlign: "center"
    }
})

export default DashboardScreen;
