<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class SuaraMasuk implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */

    public $suaramasuk;

    public function __construct($suaramasuk)
    {
        $this->suaramasuk = $suaramasuk;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    // public function broadcastOn(): array
    // {
    //     return [
    //         // new PrivateChannel('channel-name'),
    //         new Channel('suara-masuk'),
    //     ];
    // }
    public function broadcastOn()
    {
        return ['channel-tps'];
    }

    public function broadcastAs()
    {
        return 'my-suara';
    }
}
