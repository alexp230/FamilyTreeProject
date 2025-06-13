import * as FileSystem from 'expo-file-system';

// firstName, lastName, email, userName, password
export const usersDB = FileSystem.documentDirectory + 'users.txt';