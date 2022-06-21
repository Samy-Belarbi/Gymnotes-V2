<!-- 

namespace App\Controllers;

use Library\Core\AbstractController;
use Library\Http\NotFoundException;
use App\Models\EventModel;

class EventController extends AbstractController
{
    public function index(): void
    {
        $model = new EventModel();
        $events = $model->findAll();
        
        $this->display('events/index', [
            'events' => $events    
        ]);
    }
    
    public function show(): void
    {
        $id = $_GET['id'];
        $model = new EventModel();
        $event = $model->find($id);
        
        
        if ($event === null) {
            throw new NotFoundException("L'événement n'existe pas");
        }
        
        $this->display('events/show', [
            'event' => $event    
        ]);
    }
    
    public function create(): void
    {
        $this->display('events/create');
    }
    
    public function store(): void
    {
        $model = new EventModel();
        
        $id = $model->create([
            'title' => $_POST['title'],
            'description' => $_POST['description'],
            'event_at' => $_POST['event_at'],
            'address' => $_POST['address']
        ]);
        
        $this->redirect('/events');
    }
} -->