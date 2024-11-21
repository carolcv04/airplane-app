#imports
from helper import helper
from db_operations import db_operations
from datetime import datetime
from datetime import date

db_ops = db_operations("Airplane")

def startScreen():
    #ask user if they have an account
    db_ops.create_flight_table()
    db_ops.create_customer_table()
    db_ops.create_plane_table()
    db_ops.create_ticket_table()
    db_ops.create_seat_table()
    db_ops.create_payment_option_table()

    #make sure to state the filepath inside the () ex. "/Users/carolina/DataGripProjects/CPSC408/RideshareLab/Data/rating.csv"
    db_ops.populate_customer_table("C:/Users/Thoma/OneDrive/Desktop/Airplane App/airplane-app/customer.csv")
    db_ops.populate_flight_table("C:/Users/Thoma/OneDrive/Desktop/Airplane App/airplane-app/flight.csv")
    db_ops.populate_payment_option_table("C:/Users/Thoma/OneDrive/Desktop/Airplane App/airplane-app/payment_option.csv")
    db_ops.populate_ticket_table("C:/Users/Thoma/OneDrive/Desktop/Airplane App/airplane-app/ticket.csv")
    db_ops.populate_seat_table("C:/Users/Thoma/OneDrive/Desktop/Airplane App/airplane-app/seat.csv")
    db_ops.populate_plane_table("C:/Users/Thoma/OneDrive/Desktop/Airplane App/airplane-app/plane.csv")
