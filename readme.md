| Dependencias | Description |
| -- | -- |
| "@react-native-async-storage/async-storage" | almacenamiento o persistenncia de daaor |
| "@react-navigation/bottom-tabs" | botones en la parte inferior |
| "@react-navigation/native" | saltar entre pantallas  |
| "@react-navigation/stack" | tener base de las pantallas |
| "react-native-linear-gradient" | Para Componente con gradientes |
| "@react-native-community/masked-view" |  |
| "react-native-gesture-handler" |  |
| "react-native-reanimated" |  |
| "react-native-safe-area-context" |  |
| "react-native-screens" |  |

### Cambiar la version para generar nuevamente
```
  // android/app/build.gradle

  defaultConfig {
    ...
    versionCode 10
    versionName "2.7.2"
  }
  // nueva version
  defaultConfig {
    ...
    versionCode 11
    versionName "2.7.3"
  }
```

### Reduccion de Apk v1
https://www.folio3.com/mobile/blog/how-to-reduce-apk-size-in-react-native/
s

#### Generar AAB
```
  cd android
  ./gradlew bundleRelease
```
#### ProGuard - reducir codigo innecesario
```
  // android/app/build.gradle
  def enableProguardInReleaseBuilds = false
```
#### shrinkResources - reducir codigo innecesario
```
  // android/app/build.gradle
  buildTypes {
       release {
        //Add the following//
    	shrinkResources true
        minifyEnabled true
       }
   }
```

#### Separar arquitecturas
 arm -
 x86 -

 ```
  // android/app/build.gradle
  def enableSeparateBuildPerCPUArchitecture = true
 ```

<!-- git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/jasbel/himnoApp.git
git push -u origin main -->


<!-- p:Miromero777
u:Asbel Apaza
c:Atlas Connect -->

### link testers
https://play.google.com/store/apps/details?id=com.himnoapp

### Notificacion

### Reset Cache
cd android & gradlew clean
rm -rf node_modules && npm install
npm start -- --reset-cache
