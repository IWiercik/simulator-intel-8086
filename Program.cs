using System;
namespace Projekt_INTEL8086
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int loopCounter = 0;
            string AL = "0", AH = "0";
            string[] registerNames = new string[2] { "AL", "AH" };
            string[] registerValues = new string[2] { AL, AH };

            // string AL = "0", AH = "0", BL = "0", BH = "0", CL = "0", CH = "0", DL = "0", DH = "0";
            // string[] registerNames = new string[8] { "AL", "AH", "BL", "BH", "CL", "CH", "DL", "DH" };
            // string[] registerValues = new string[8] { AH, AL, BL, BH, CL, CH, DL, DH };
            while (loopCounter < registerValues.Length)
            {
                Console.WriteLine("Podaj wartość dla rejestru:" + registerNames[loopCounter]);
                string userInput = Console.ReadLine();
                if (!string.IsNullOrEmpty(userInput))
                {
                    bool isParsableToByte = IsHex(userInput);
                    if (isParsableToByte)
                    {
                        int decimalNumber = hexToDecimal(userInput);
                        if (decimalNumber <= 255)
                        {
                            string hexaDecimal = decimalNumber.ToString("X");
                            if (hexaDecimal.Length == 1)
                            {
                                hexaDecimal = "0" + hexaDecimal;
                            }
                            registerValues[loopCounter] = hexaDecimal;
                            loopCounter++;
                        }
                        else
                        {
                            System.Console.WriteLine("Zła wartość, zakres danych wynosi 0-255");
                        }

                    }
                    else
                    {
                        System.Console.WriteLine("Zła wartość, nasz zakres to 00:FF");
                    }
                }
                else
                {
                    System.Console.WriteLine("Input nie może być pusty!");
                }
            }
            System.Console.WriteLine("\nUdało ci sie wpisać wszystkie potrzebne wartości do rejestrów");
            showingArrayContent(registerValues, registerNames);
            System.Console.WriteLine("\nJaka chcesz wykonac teraz operacje ?\n 1:MOV 2:EXH");
            string operation = (Console.ReadLine()).ToUpper();
            while (!(operation == "1" || operation == "MOV" || operation == "2" || operation == "EXH"))
            {
                System.Console.WriteLine("Niepoprawna wartość, proszę wybrac pomiędzy 1/MOV a  2/EXH");
                operation = (Console.ReadLine()).ToUpper();
                if (operation == "1")
                {
                    operation = "MOV";
                }
                else if (operation == "2")
                {
                    operation = "EXH";
                }
            }
            string firstRegister = "";
            string secondRegister = "";
            while (firstRegister == "" || secondRegister == "")
            {
                if (firstRegister == "")
                {
                    System.Console.WriteLine("Wybierz rejestr 1 na którym ma zostac wykonana operacja " + "[" + operation + "]");
                    firstRegister = (Console.ReadLine()).ToUpper();
                    int arrrayContainRegister = Array.IndexOf(registerNames, firstRegister);
                    if (arrrayContainRegister == -1)
                    {
                        System.Console.WriteLine("\nNiepoprawna wartość proszę wybrac prawidłowy rejestr!");
                        firstRegister = "";
                    }
                }
                else
                {
                    System.Console.WriteLine("\nWybierz rejestr 2 na którym ma zostac wykonana operacja " + "[" + operation + "]");
                    secondRegister = (Console.ReadLine()).ToUpper();
                    if (secondRegister == firstRegister)
                    {
                        System.Console.WriteLine("Nie możesz wybrać tego samego rejestru!");
                        secondRegister = "";
                    }
                    else
                    {
                        int arrrayContainRegister = Array.IndexOf(registerNames, secondRegister);
                        if (arrrayContainRegister == -1)
                        {
                            System.Console.WriteLine("\nNiepoprawna wartość proszę wybrac prawidłowy rejestr!");
                            secondRegister = "";
                        }
                    }
                }

            }
            switch (operation)
            {
                case "MOV":
                    break;
                case "EXH":
                    break;
                default:
                break;
            }

        }
        static void showingArrayContent(string[] tableWithValues, string[] tableWithNames)
        {
            string txt = "[";
            for (int i = 0; i < tableWithValues.Length; i++)
            {
                txt += tableWithNames[i] + ":" + tableWithValues[i];
                if (i < tableWithValues.Length - 1)
                {
                    txt += ", ";
                }
            }
            txt += "]";
            Console.WriteLine(txt);
        }
        static bool IsHex(IEnumerable<char> chars)
        {
            bool isHex;
            foreach (var c in chars)
            {
                isHex = ((c >= '0' && c <= '9') ||
                         (c >= 'a' && c <= 'f') ||
                         (c >= 'A' && c <= 'F'));

                if (!isHex)
                    return false;
            }
            return true;
        }
        static int hexToDecimal(string input)
        {
            // Convert the hex string to decimal integer
            int decimalValue = Convert.ToInt32(input, 16);
            return decimalValue;
        }
    }
}