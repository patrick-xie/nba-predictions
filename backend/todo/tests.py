from django.test import TestCase

# Create your tests here.
from todo.models import Todo

class TodoTestCase(TestCase):
    def setUp(self):
        Todo.objects.create(title="rockets", description="suck")
        Todo.objects.create(title="wizards", description="suck more")

    def test_Todos_work(self):
        rockets = Todo.objects.get(description="suck")
        wizards = Todo.objects.get(description="suck more")
        self.assertEqual(rockets._str_(), 'rockets')
        self.assertEqual(wizards._str_(), 'wizards')
