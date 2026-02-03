package crud;

import java.sql.*;

public class Stcrud {

    // CREATE
    public static void insertStudent(Student s) {
        try {
            Connection con = DBConnection.getConnection();
            String sql = "INSERT INTO students(name, email, age) VALUES (?, ?, ?)";
            PreparedStatement ps = con.prepareStatement(sql);

            ps.setString(1, s.name);
            ps.setString(2, s.email);
            ps.setInt(3, s.age);

            ps.executeUpdate();
            System.out.println("Student Inserted");
            con.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // READ
    public static void readStudents() {
        try {
            Connection con = DBConnection.getConnection();
            Statement st = con.createStatement();
            ResultSet rs = st.executeQuery("SELECT * FROM students");

            while (rs.next()) {
                System.out.println(
                    rs.getInt("id") + " " +
                    rs.getString("name") + " " +
                    rs.getString("email") + " " +
                    rs.getInt("age")
                );
            }
            con.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // UPDATE
    public static void updateStudent(int id, int age) {
        try {
            Connection con = DBConnection.getConnection();
            String sql = "UPDATE students SET age=? WHERE id=?";
            PreparedStatement ps = con.prepareStatement(sql);

            ps.setInt(1, age);
            ps.setInt(2, id);

            ps.executeUpdate();
            System.out.println("Student Updated");
            con.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // DELETE
    public static void deleteStudent(int id) {
        try {
            Connection con = DBConnection.getConnection();
            String sql = "DELETE FROM students WHERE id=?";
            PreparedStatement ps = con.prepareStatement(sql);

            ps.setInt(1, id);
            ps.executeUpdate();

            System.out.println("Student Deleted");
            con.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
