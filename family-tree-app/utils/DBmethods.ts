import * as FileSystem from 'expo-file-system';

export const readFromFile = async (filePath: string): Promise<string> => {
  try 
  {
    const fileInfo = await FileSystem.getInfoAsync(filePath);
    return (fileInfo.exists) ? await FileSystem.readAsStringAsync(filePath) : "";
  } 
  catch (error) 
  {
    console.error("Failed to read file:", error);
    return "fail";
  }
};

export const writeToFile = async (filePath: string, content: string): Promise<void> => {
  try 
  {
    await FileSystem.writeAsStringAsync(filePath, content);
  } 
  catch (error) 
  {
    console.error("Failed to write to file:", error);
  }
};

export const appendToFile = async (filePath:string, content: string): Promise<void> => {
  try 
  {
    const existing = await readFromFile(filePath);
    const combined = existing ? `${existing}\n${content}` : content;
    await writeToFile(filePath, combined);
  } 
  catch (error) 
  {
    console.error("Failed to append to file:", error);
  }
};

export const clearFile = async (filePath:string) => {
  try
  {
    await FileSystem.writeAsStringAsync(filePath, "");
  }
  catch (error)
  {
    console.error("Failed to clear file.", error);
  }
}
