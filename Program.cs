using System;
namespace Projekt_INTEL8086
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int loopCounter = 0;
            string AL = "0", AH = "0", BL = "0", BH = "0", CL = "0", CH = "0", DL = "0", DH = "0";
            string[] registerNames = new string[8] { "AL", "AH", "BL", "BH", "CL", "CH", "DL", "DH" };
            string[] registerValues = new string[8] { AH, AL, BL, BH, CL, CH, DL, DH };
            while (loopCounter < registerValues.Length)
            {
                Console.WriteLine("Podaj wartość dla rejestru:" + registerNames[loopCounter]);
                string userInput = Console.ReadLine();
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
                        System.Console.WriteLine("Zła wartość ");
                    }

                }
                else
                {
                    System.Console.WriteLine("Zła wartość, nasz zakres to 00:FF");
                }
            }
            showingArrayContent(registerValues, registerNames);

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
        static void printTable(char[] table)
        {
            string txt = "[";
            for (int i = 0; i < table.Length; i++)
            {
                txt += table[i];
                if (i < table.Length - 1)
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
        static char[] stringToArray(string text)
        {
            char[] letters = new char[text.Length];
            for (int i = 0; i < text.Length; i++)
            {
                letters[i] = text[i];
            }
            return letters;
        }
        static int hexToDecimal(string input)
        {
            // Convert the hex string to decimal integer
            int decimalValue = Convert.ToInt32(input, 16);


            return decimalValue;
        }



    }
}