package crud;

import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        while (true) {
            System.out.println("\n1.Insert  2.View  3.Update  4.Delete  5.Exit");
            int choice = sc.nextInt();

            switch (choice) {
                case 1:
                    System.out.print("Name: ");
                    String name = sc.next();
                    System.out.print("Email: ");
                    String email = sc.next();
                    System.out.print("Age: ");
                    int age = sc.nextInt();

                    Student s = new Student(name, email, age);
                    Stcrud.insertStudent(s);
                    break;

                case 2:
                    Stcrud.readStudents();
                    break;

                case 3:
                    System.out.print("ID: ");
                    int uid = sc.nextInt();
                    System.out.print("New Age: ");
                    int newAge = sc.nextInt();
                    Stcrud.updateStudent(uid, newAge);
                    break;

                case 4:
                    System.out.print("ID: ");
                    int did = sc.nextInt();
                    Stcrud.deleteStudent(did);
                    break;

                case 5:
                    System.exit(0);
            }
        }
    }
}