import mysql.connector
from helper import helper

class db_operations():
    # constructor with connection path to DB
    #TODO CHANGE THE CONNECTION TO YOUR OWN!!!
    def __init__(self, database):
        self.connection = mysql.connector.connect(host="localhost",
            user="root",
            password="CPSC408",
            auth_plugin='mysql_native_password')
        self.cursor = self.connection.cursor()

        create_db_query = f"CREATE DATABASE IF NOT EXISTS {database}"
        self.cursor.execute(create_db_query)

        # Select the database
        self.cursor.execute(f"USE {database}")

        print(f"Database '{database}' created successfully.")
        print("connection made..")

    # function to simply execute a DDL or DML query.
    # commits query, returns no results. 
    # best used for insert/update/delete queries with no parameters
    def modify_query(self, query):
        self.cursor.execute(query)
        self.connection.commit()

    # function to simply execute a DDL or DML query with parameters
    # commits query, returns no results. 
    # best used for insert/update/delete queries with named placeholders
    def modify_query_params(self, query, dictionary):
        self.cursor.execute(query, dictionary)
        self.connection.commit()

    # function to simply execute a DQL query
    # does not commit, returns results
    # best used for select queries with no parameters
    def select_query(self, query):
        self.cursor.execute(query)
        return self.cursor.fetchall()
    
    # function to simply execute a DQL query with parameters
    # does not commit, returns results
    # best used for select queries with named placeholders
    def select_query_params(self, query, dictionary):
        self.cursor.execute(query, dictionary)
        return self.cursor.fetchall()

    # function to return the value of the first row's 
    # first attribute of some select query.
    # best used for querying a single aggregate select 
    # query with no parameters
    def single_record(self, query):
        self.cursor.execute(query)
        return self.cursor.fetchone()[0]
    
    # function to return the value of the first row's 
    # first attribute of some select query.
    # best used for querying a single aggregate select 
    # query with named placeholders
    def single_record_params(self, query, dictionary):
        self.cursor.execute(query, dictionary)
        return self.cursor.fetchone()[0]
    
    # function to return a single attribute for all records 
    # from some table.
    # best used for select statements with no parameters
    def single_attribute(self, query):
        self.cursor.execute(query)
        results = self.cursor.fetchall()
        results = [i[0] for i in results]
        #results.remove(None)
        return results
    
    # function to return a single attribute for all records 
    # from some table.
    # best used for select statements with named placeholders
    def single_attribute_params(self, query, dictionary):
        self.cursor.execute(query,dictionary)
        results = self.cursor.fetchall()
        results = [i[0] for i in results]
        return results
    
    # function for bulk inserting records
    # best used for inserting many records with parameters
    def bulk_insert(self, query, data):
        self.cursor.executemany(query, data)
        self.connection.commit()
    
    # function that creates table songs in our database
    def create_flight_table(self):
        query = '''
        CREATE TABLE Flight(
            FlightID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
            DepartureAirport VARCHAR(10) NOT NULL,
            DestinationAirport VARCHAR(10) NOT NULL,
            DepartureTime DATETIME, 
            BoardingTime DATETIME,
            PlaneID INT NOT NULL,  
            FOREIGN KEY (PlaneID) REFERENCES Plane(PlaneID)
         );
        '''
        self.cursor.execute(query)
        print('Flight table created successfully')
    
    def create_customer_table(self):
        query = '''
        CREATE TABLE Customer(
            CustomerID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
            Username VARCHAR(20) NOT NULL,
            Password VARCHAR(20) NOT NULL,
            DateOfBirth DATE NOT NULL,
            FirstName VARCHAR(50) NOT NULL,
            LastName VARCHAR(50) NOT NULL
        );
        '''
        self.cursor.execute(query)
        print('Customer Table Created sucessfully')

    def create_plane_table(self):
        query = '''
        CREATE TABLE Plane(
            PlaneID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
            Airline VARCHAR(100),
            NumberOfSeats INT NOT NULL
        );
        '''
        self.cursor.execute(query)
        print('Plane table created successfully.')


    
    def create_ticket_table(self):
        query = '''
        CREATE TABLE Ticket(
            TicketID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
            BoardingGroup INT,
            FlightID INT NOT NULL,
            CustomerID INT NOT NULL,
            SeatID INT NOT NULL,
            FOREIGN KEY (FlightID) REFERENCES Flight(FlightID),
            FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID),
            FOREIGN KEY (SeatID) REFERENCES Seat(SeatID)
        );
        '''
        self.cursor.execute(query)
        print('Ticket table created successfully')

    def create_seat_table(self):
        query = '''
        CREATE TABLE Seat(
            SeatID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
            SeatNumber INT,
            SeatType VARCHAR(20),
            Amenities BOOLEAN,
            Baggage BOOLEAN,
            PlaneID INT NOT NULL,  -- Define PlaneID as a column
            FOREIGN KEY (PlaneID) REFERENCES Plane(PlaneID)
        );
        '''
        self.cursor.execute(query)
        print('Seat table created successfully')

    def create_payment_option_table(self):
        query = '''
        CREATE TABLE PaymentOption(
            PaymentID INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
            FlyerPoints INT,
            CreditCard VARCHAR(16),
            Cancellations INT,
            CustomerID INT NOT NULL,  -- Define CustomerID in PaymentOption
            FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
        );
        '''
        self.cursor.execute(query)
        print('PaymentOption table created successfully')


    # functions that return if a table has records
    def is_table_empty(self, table_name):
        #query to get count of songs in table
        query = f'''
        SELECT COUNT(*)
        FROM {table_name};
        '''
        #run query and return value
        result = self.single_record(query)
        return result == 0

    def is_customer_empty(self):
        return self.is_table_empty('Customer')
    
    def is_flight_empty(self):
        return self.is_table_empty('Flight')
    
    def is_payment_option_empty(self):
        return self.is_table_empty('PaymentOption')
    
    def is_ticket_empty(self):
        return self.is_table_empty('Ticket')
    
    def is_seat_empty(self):
        return self.is_table_empty('Seat')

    def is_plane_empty(self):
        return self.is_table_empty('Plane')
    
    # function to populate tables given some path
    # to a CSV containing records
    def populate_table(self, filepath, table_name, auto_increment):

        data = helper.data_cleaner(filepath)
        if auto_increment:
            column_names = data[0]
            attribute_count = len(column_names)
            placeholders = ("%s,"*attribute_count)[:-1]
            query = f"INSERT INTO {table_name} ({(', '.join(column_names))}) VALUES({placeholders})"
            self.bulk_insert(query, data[1::])
        else:
            attribute_count = len(data[0])
            placeholders = ("%s,"*attribute_count)[:-1]
            query = f"INSERT INTO {table_name} VALUES({placeholders})"
            self.bulk_insert(query, data)

        print(f"{table_name} sucessfully populated.")

    def populate_customer_table(self, filepath):
        if self.is_customer_empty():
            self.populate_table(filepath, "Customer", True)

    def populate_flight_table(self, filepath):
        if self.is_flight_empty():
            self.populate_table(filepath, "Flight", True)

    def populate_payment_option_table(self, filepath):
        if self.is_payment_option_empty():
            self.populate_table(filepath, "PaymentOption", True)
    
    def populate_ticket_table(self, filepath):
        if self.is_ticket_empty():
            self.populate_table(filepath, "Ticket", True)
    
    def populate_seat_table(self, filepath):
        if self.is_seat_empty():
            self.populate_table(filepath, "Seat", True)
    
    def populate_plane_table(self, filepath):
        if self.is_plane_empty():
            self.populate_table(filepath, "Plane", True)
    
    # destructor that closes connection with DB
    def destructor(self):
        self.cursor.close()
        self.connection.close()