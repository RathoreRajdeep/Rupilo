// controllers/paymentController.js
const User = require('../models/User');
const Transaction = require('../models/Transaction');

exports.sendPayment = async (req, res) => {
  const { vpa, amount, description } = req.body;
  const senderId = req.user.userId; // from JWT middleware

  try {
    const sender = await User.findById(senderId);
    const receiver = await User.findOne({ vpa });

    
    console.log('Sender:', sender?.email, 'Balance:', sender?.balance);
    console.log('Receiver:', receiver?.email, 'Balance:', receiver?.balance);
    console.log('Amount:', amount);


    if (!receiver) return res.status(404).json({ message: 'Receiver VPA not found' });
    if (sender.balance < amount) return res.status(400).json({ message: 'Insufficient balance' });

    // Update balances
    sender.balance -= amount;
    receiver.balance += amount;
    await sender.save();
    await receiver.save();

    // Record transaction
    const transaction = new Transaction({
      sender: sender._id,
      receiver: receiver._id,
      amount,
      description
    });
    await transaction.save();

    res.status(200).json({ message: 'Payment successful' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
